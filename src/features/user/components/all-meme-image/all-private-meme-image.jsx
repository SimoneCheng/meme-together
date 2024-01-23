import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPrivateMemeImage,
  changeMemePublicStatus,
  deleteMemeImageInDb,
  deleteMemeImageInStorage
} from "../../api";
import { Button } from "@/components/button";
import {
  StyledNoContentWrapper,
  StyledAllMemeImageWrapper,
  StyledMemeImageWrapper,
  StyledImg,
  StyledWrapper
} from "./all-meme-image.style";
import { alertSuccess } from "@/utlis/alert";

const PrivateMemeImage = (props) => {
  const {
    title,
    imgSrc,
    imgName,
    createdTime,
    lastSaveTime,
  } = props;

  const handleMemePublicStatusChange = () => {
    changeMemePublicStatus({
      docId: imgName,
      isPublic: true,
    })
      .then(() => {
        alertSuccess('已公開發布！');
      });
  };

  const clickDownloadImage = (img_url, imageFormat) => {
    fetch(img_url)
      .then(res => res.blob())
      .then(blob => {
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = `meme-generator-${new Date().getTime()}.${imageFormat}`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };

  const deleteImg = (docId) => {
    deleteMemeImageInDb(docId)
      .then(() => {
        deleteMemeImageInStorage(docId).then(() => alertSuccess('成功刪除！'));
      })
  }

  return (
    <StyledMemeImageWrapper>
      <Link to={`/meme/${imgName}`}>
        <StyledImg src={imgSrc} alt={imgName} />
      </Link>
      <StyledWrapper>
        <p>
          <strong>標題：</strong><br />
          {title}
        </p>
        <p>
          <strong>建立時間：</strong><br />
          {new Date(createdTime.toDate()).toLocaleString()}
        </p>
        <p>
          <strong>上次儲存時間：</strong><br />
          {new Date(lastSaveTime.toDate()).toLocaleString()}
        </p>
        <div>
          下載圖片：
          <Button
            colorScheme="navyBlue"
            variant="outline"
            onClick={() => clickDownloadImage(imgSrc, "jpg")}
          >
            jpg
          </Button>
          <Button
            colorScheme="navyBlue"
            variant="outline"
            style={{ 'marginLeft': '12px' }}
            onClick={() => clickDownloadImage(imgSrc, "png")}
          >
            png
          </Button>
        </div>
        <div style={{ 'margin': '16px 0' }}>
          <Button
            colorScheme="navyBlue"
            variant="outline"
            onClick={handleMemePublicStatusChange}
          >
            公開發布
          </Button>
        </div>
        <div style={{ 'marginTop': '16px' }}>
          <Button
            colorScheme="navyBlue"
            variant="outline"
            onClick={() => deleteImg(imgName)}
          >
            刪除
          </Button>
        </div>
      </StyledWrapper>
    </StyledMemeImageWrapper>
  );
};

const AllPublicMemeImage = () => {
  const userId = useSelector((state) => state.userData?.user_id);
  const [allPrivateMeme, setAllPrivateMeme] = useState([]);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = getPrivateMemeImage({
      id: userId,
      callback: setAllPrivateMeme
    });
    return () => unsubscribe();
  }, [userId])

  if (allPrivateMeme.length === 0) {
    return (
      <StyledNoContentWrapper>
        空空的喔～
      </StyledNoContentWrapper>
    )
  }

  return (
    <StyledAllMemeImageWrapper>
      {allPrivateMeme.map((item) => {
        const {
          title,
          img_url,
          img_name,
          created_time,
          last_save_time,
        } = item;
        return (
          <PrivateMemeImage
            key={img_name}
            title={title}
            imgSrc={img_url}
            imgName={img_name}
            createdTime={created_time}
            lastSaveTime={last_save_time}
          />
        )
      })}
    </StyledAllMemeImageWrapper>
  );
};

export default AllPublicMemeImage;
