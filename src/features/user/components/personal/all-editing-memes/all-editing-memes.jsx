import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";
import { useAuthId } from "@/features/auth";
import { getAllEditingMemes, deletEditingMeme } from "../../../api";
import { Button } from "@/components/button";
import { alertSuccess } from "@/utlis/alert";
import {
  StyledNoContentWrapper,
  StyledAllEditingMemesWrapper,
  StyledEditingMemeWrapper,
  StyledImg,
  StyledWrapper,
  StyledAddNewEditingMemeWrapper,
  StyledIconWrapper
} from "./all-editing-memes.style";

const EditingMeme = (props) => {
  const [authId] = useAuthId();
  const {
    imgSrc,
    docId,
    createdTime,
    lastSaveTime
  } = props;

  const handleClick = () => {
    deletEditingMeme({
      id: authId,
      docId
    }).then(() => {
      alertSuccess('刪除成功！');
    });
  };

  return (
    <StyledEditingMemeWrapper>
      <Link to={`/personal/meme-generator/${docId}`}>
        <StyledImg src={imgSrc} alt={docId} />
      </Link>
      <StyledWrapper>
        <p>
          <strong>建立時間：</strong><br />
          {new Date(createdTime.toDate()).toLocaleString()}
        </p>
        <p>
          <strong>上次儲存時間：</strong><br />
          {new Date(lastSaveTime.toDate()).toLocaleString()}
        </p>
        <Button
          colorScheme="navyBlue"
          variant="outline"
          onClick={handleClick}
        >
          刪除
        </Button>
      </StyledWrapper>
    </StyledEditingMemeWrapper>
  );
};

const AddNewEditingMeme = () => {
  return (
    <StyledAddNewEditingMemeWrapper>
      <Link to="/templates">
        <StyledIconWrapper>
          <MdAddCircleOutline />
        </StyledIconWrapper>
      </Link>
      <div>
        <Link to="/templates" style={{ 'color': '#056' }}>
          新增創作
        </Link>
      </div>
    </StyledAddNewEditingMemeWrapper>
  );
};

const AllEditingMemes = () => {
  const [authId] = useAuthId();
  const [allEditingMemes, setAllEditingMemes] = useState([]);

  useEffect(() => {
    if (!authId) return;
    const unsubscribe = getAllEditingMemes({
      id: authId,
      callback: setAllEditingMemes
    });
    return unsubscribe;
  }, [authId]);

  if (allEditingMemes.length === 0) {
    return (
      <StyledNoContentWrapper>
        空空的喔～
      </StyledNoContentWrapper>
    );
  }

  return (
    <StyledAllEditingMemesWrapper>
      {allEditingMemes.map((item) => {
        const { data, docId } = item;
        return (
          <EditingMeme
            key={docId}
            docId={docId}
            imgSrc={data.backgroundImage_src}
            createdTime={data.created_time}
            lastSaveTime={data.last_save_time}
          />
        );
      })}
      <AddNewEditingMeme />
    </StyledAllEditingMemesWrapper>
  );
};

export default AllEditingMemes;
