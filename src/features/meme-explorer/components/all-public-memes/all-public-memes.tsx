import { useEffect, useState } from 'react';
// api
import {
  getAllPublicMemes,
  getAllPublicMemesNextPage,
} from '../../api';
// components
import { PublicMemesSearchBar } from '../public-memes-search-bar';
import PublicMemeItem from './public-meme-item';
import { Button } from '@/components/button';
import { Loading } from '@/components/loading';
// styles
import {
  StyledSearchAndSortWrapper,
  StyledAllPublicMemesWrapper,
  StyledLoadingWrapper,
  StyledSelect
} from './all-public-memes.style';

const AllPublicMemes = () => {
  const [allPublicMemeImg, setAllPublicMemeImg] = useState([]);
  const [lastKey, setLastKey] = useState<unknown>();
  const [sort, setSort] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    getAllPublicMemes(sort).then((res) => {
      const { allPublicMemeImgData, lastKey } = res;
      setAllPublicMemeImg(allPublicMemeImgData);
      setLastKey(lastKey);
    });
  }, [sort]);

  if (allPublicMemeImg.length === 0) {
    return (
      <StyledLoadingWrapper>
        <Loading
          type="spinningBubbles"
          color="#056"
          width={50}
          height={50}
        />
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
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

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
        {allPublicMemeImg.map((item, index) => (<PublicMemeItem key={index} {...item} />))}
      </StyledAllPublicMemesWrapper>
      {lastKey ? (
        <Button
          colorScheme="navyBlue"
          variant="solid"
          onClick={getMoreMeme}
        >
          載入更多
        </Button>
      ) : (
        <div>沒有囉！</div>
      )}
    </>
  );
};

export default AllPublicMemes;
