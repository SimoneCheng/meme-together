import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// api
import {
  getAllPublicMemes,
  getAllPublicMemesNextPage,
  countClickTime
} from '../../api';
// components
import { PublicMemesSearchBar } from '../public-memes-search-bar';
// styles
import {
  StyledSearchAndSortWrapper,
  StyledPublicMemeWrapper,
  StyledPublicMemeImg,
  StyledButton,
  StyledAllPublicMemesWrapper,
  StyledLoadingWrapper,
  StyledSelect
} from './all-public-memes.style';
// utils
import { loading } from '@/utlis/loading';

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
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    getAllPublicMemes(sort).then((res) => {
      const { allPublicMemeImgData, lastKey } = res;
      setAllPublicMemeImg(allPublicMemeImgData);
      setLastKey(lastKey);
    });
  }, [sort])

  if (allPublicMemeImg.length === 0) {
    return (
      <StyledLoadingWrapper>
        {loading('spinningBubbles', '#056', 50, 50)}
      </StyledLoadingWrapper>
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

  const handleSortChange = (e) => {
    setSort(e.target.value);
  }

  return (
    <>
      <StyledSearchAndSortWrapper>
        <PublicMemesSearchBar />
        <div>
          <span>排序：</span>
          <StyledSelect onChange={handleSortChange}>
            <option value='desc'>
              依發布日期：由新到舊
            </option>
            <option value='asc'>
              依發布日期：由舊到新
            </option>
          </StyledSelect>
        </div>
      </StyledSearchAndSortWrapper>
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
