import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthId } from "@/features/auth";
import { getAllFavorite, deletFromFavorite } from "../../../api";
import { Button } from "@/components/button";
import {
  StyledNoContentWrapper,
  StyledAllFavoriteWrapper,
  StyledFavoriteWrapper,
  StyledImg,
  StyledWrapper
} from "./all-favorite.style";
import { alertSuccess } from "@/utlis/alert";

const Favorite = (props) => {
  const [authId] = useAuthId();
  const {
    imgName,
    imgSrc,
    createdTime
  } = props;

  const handleClick = () => {
    deletFromFavorite({
      id: authId,
      docId: imgName
    }).then(() => {
      alertSuccess('已取消收藏');
    });
  };

  return (
    <StyledFavoriteWrapper>
      <Link to={`/meme/${imgName}`}>
        <StyledImg src={imgSrc} alt={imgName} />
      </Link>
      <StyledWrapper>
        <p>
          <strong>建立時間：</strong><br />
          {new Date(createdTime.toDate()).toLocaleString()}
        </p>
        <Button
          colorScheme="navyBlue"
          variant="outline"
          onClick={handleClick}
        >
          移除收藏
        </Button>
      </StyledWrapper>
    </StyledFavoriteWrapper>
  );
};

const AllFavorite = () => {
  const [authId] = useAuthId();
  const [allFavorite, setAllFavorite] = useState([]);

  useEffect(() => {
    if (!authId) return;
    const unsubscribe = getAllFavorite({
      id: authId,
      callback: setAllFavorite
    });
    return unsubscribe;
  }, [authId]);

  if (allFavorite.length === 0) {
    return (
      <StyledNoContentWrapper>
        空空的喔～
      </StyledNoContentWrapper>
    );
  }

  return (
    <StyledAllFavoriteWrapper>
      {allFavorite.map((item) => {
        const {
          img_url,
          img_name,
          created_time
        } = item;
        return (
          <Favorite
            key={img_name}
            imgName={img_name}
            imgSrc={img_url}
            createdTime={created_time}
          />
        );
      })}
    </StyledAllFavoriteWrapper>
  );
};

export default AllFavorite;
