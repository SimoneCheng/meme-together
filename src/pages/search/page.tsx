import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useScrollTo } from '@/hooks';
import {
  searchPublicMemes,
  PublicMemesSearchBar,
  PublicMemeItem
} from '@/features/meme-explorer';
import { StyledWrapper, StyledSearchedMemesWrapper } from './style';

const Search = () => {
  const { query } = useParams<{ query: string; }>();
  const [searchResult, setSearchResult] = useState([]);

  useScrollTo();

  useEffect(() => {
    searchPublicMemes(query).then((response) => {
      setSearchResult(response);
    });
  }, [query]);

  if (searchResult.length === 0) {
    return (
      <StyledWrapper>
        <PublicMemesSearchBar />
        <p>您搜尋的關鍵字為：<strong>{query}</strong>，查無結果</p>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <PublicMemesSearchBar />
      <p>
        <strong>{query}</strong> 的搜尋結果：
      </p>
      <StyledSearchedMemesWrapper>
        {searchResult.map((item, index) => <PublicMemeItem key={index} {...item} />)}
      </StyledSearchedMemesWrapper>
    </StyledWrapper>
  );
};

export default Search;
