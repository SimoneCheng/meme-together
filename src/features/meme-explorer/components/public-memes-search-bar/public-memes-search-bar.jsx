import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import {
  StyledWrapper,
  StyledInput,
  StyledButton
} from './public-memes-search-bar.style';

const PublicMemesSearchBar = () => {
  const history = useHistory();
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    history.push(`/search/${value}`);
  }

  return (
    <StyledWrapper>
      <StyledInput
        placeholder="輸入標題、tags......"
        type="search"
        value={value}
        onChange={handleChange}
      />
      <StyledButton
        colorScheme="navyBlue"
        variant="solid"
        onClick={handleClick}
      >
        <FaSearch />
      </StyledButton>
    </StyledWrapper>
  );
};

export default PublicMemesSearchBar;
