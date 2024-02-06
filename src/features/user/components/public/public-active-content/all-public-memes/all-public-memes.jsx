import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { countClickTime } from "@/features/meme-explorer";
import { getPublicMemeImage } from "@/features/user/api";
import { usePublicPersonalInfo } from "@/features/user/store";
import {
  StyledButton,
  StyledImg,
  StyledNoContentWrapper,
  StyledWrapper
} from "./all-public-memes.style";

const PublicMeme = (props) => {
  const history = useHistory();
  const { imgName, imgUrl } = props;

  const handleClick = () => {
    countClickTime(imgName)
      .then(() => {
        history.push(`/meme/${imgName}`)
      });
  };

  return (
    <StyledButton variant="unstyled" onClick={handleClick}>
      <StyledImg src={imgUrl} alt={imgName} />
    </StyledButton>
  );
};

const AllPublicMemes = () => {
  const [publicPersonalInfo] = usePublicPersonalInfo();
  const [allPublicMemes, setAllPublicMemes] = useState([]);

  useEffect(() => {
    if (!publicPersonalInfo.userId) return;
    const unsubscribe = getPublicMemeImage({
      id: publicPersonalInfo.userId,
      callback: setAllPublicMemes
    })
    return () => unsubscribe();
  }, [publicPersonalInfo.userId])

  if (allPublicMemes.length === 0) {
    return (
      <StyledNoContentWrapper>
        目前沒有創作喔～
      </StyledNoContentWrapper>
    );
  }

  return (
    <StyledWrapper>
      {allPublicMemes.map((item) => {
        const { img_url, img_name } = item;
        return (
          <PublicMeme
            key={img_name}
            imgName={img_name}
            imgUrl={img_url}
          />
        );
      })}
    </StyledWrapper>
  );
};

export default AllPublicMemes;
