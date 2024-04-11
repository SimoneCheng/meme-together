import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthId } from "@/features/auth";
import {
  getPublicMemeImage,
  changeMemePublicStatus,
  deleteMemeImageInDb,
  deleteMemeImageInStorage
} from "../../../api";
import { Button } from "@/components/button";
import {
  StyledNoContentWrapper,
  StyledAllMemeImageWrapper,
  StyledMemeImageWrapper,
  StyledImg,
  StyledWrapper
} from "./all-meme-image.style";
import { alertSuccess } from "@/utlis/alert";

const PublicMemeImage = (props) => {
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
      isPublic: false,
    })
      .then(() => {
        alertSuccess('已取消發布！');
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
            取消公開發布
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
  const [authId] = useAuthId();
  const [allPublicMeme, setAllPublicMeme] = useState([]);

  useEffect(() => {
    if (!authId) return;
    const unsubscribe = getPublicMemeImage({
      id: authId,
      callback: setAllPublicMeme
    });
    return unsubscribe;
  }, [authId])

  if (allPublicMeme.length === 0) {
    return (
      <StyledNoContentWrapper>
        空空的喔～
      </StyledNoContentWrapper>
    )
  }

  return (
    <StyledAllMemeImageWrapper>
      {allPublicMeme.map((item) => {
        const {
          title,
          img_url,
          img_name,
          created_time,
          last_save_time,
        } = item;
        return (
          <PublicMemeImage
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
