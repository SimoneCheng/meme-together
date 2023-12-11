import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// api
import {
  getAllPublicMemes,
  getAllPublicMemesNextPage,
  countClickTime
} from "../../api";
// styles
import {
  StyledPublicMemeWrapper,
  StyledPublicMemeImg,
  StyledButton,
  StyledAllPublicMemesWrapper
} from "./all-public-memes.style";
// utils
import { loading } from "@/utlis/loading";

const PublicMeme = (props) => {
  const { img_url, img_name } = props;
  const history = useHistory();

  const handleClick = () => {
    countClickTime(img_name);
    history.push(`/meme/${img_name}`);
  };

  return (
    <StyledPublicMemeWrapper key={img_name} onClick={handleClick}>
      <StyledPublicMemeImg src={img_url} alt={img_name} />
    </StyledPublicMemeWrapper>
  );

};

const AllPublicMemes = () => {
  const [allPublicMemeImg, setAllPublicMemeImg] = useState([]);
  const [lastKey, setLastKey] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    getAllPublicMemes('desc').then((res) => {
      const { allPublicMemeImgData, lastKey } = res;
      setAllPublicMemeImg(allPublicMemeImgData);
      setLastKey(lastKey);
    });
  }, [])

  if (allPublicMemeImg.length === 0) {
    return (
      <>
        {loading('spinningBubbles', '#056', 50, 50)}
      </>
    );
  }

  const getMoreMeme = () => {
    if (!lastKey) return;
    getAllPublicMemesNextPage(lastKey, 'desc')
      .then((res) => {
        const { allPublicMemeImgData, lastKey } = res;
        setAllPublicMemeImg(allPublicMemeImg.concat(allPublicMemeImgData));
        setLastKey(lastKey);
      });
  }

  return (
    <>
      <StyledAllPublicMemesWrapper>
        {allPublicMemeImg.map((item) => (<PublicMeme {...item} />))}
      </StyledAllPublicMemesWrapper>
      {lastKey ? (
        <StyledButton type="button" onClick={getMoreMeme}>
          載入更多
        </StyledButton>
      ) : (
        <div>沒有囉！</div>
      )}
    </>
  )
};

export default AllPublicMemes;
