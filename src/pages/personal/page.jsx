import React, { useState } from 'react';
import { useScrollTo } from '@/hooks';
import {
  AllEditingMemes,
  AllFavorite,
  AllPublicMemeImage,
  AllPrivateMemeImage,
  UserInfoSummary
} from '@/features/user';
import {
  StyledWrapper,
  StyledMemeManagementWrapper,
  StyledButtonGroup,
  StyledButton
} from './style';

function Personal() {
  const [status, setStatus] = useState('editing');

  useScrollTo();

  const handleClick = (status) => {
    setStatus(status);
  }

  return (
    <StyledWrapper>
      <UserInfoSummary />
      <StyledMemeManagementWrapper>
        <StyledButtonGroup>
          <StyledButton
            type="button"
            isActive={status === 'editing'}
            onClick={() => { handleClick('editing') }}
          >
            創作中
          </StyledButton>
          <StyledButton
            type="button"
            isActive={status === 'nopublic'}
            onClick={() => { handleClick('nopublic') }}
          >
            已完成，未發布
          </StyledButton>
          <StyledButton
            type="button"
            isActive={status === 'ispublic'}
            onClick={() => { handleClick('ispublic') }}
          >
            已發布
          </StyledButton>
          <StyledButton
            type="button"
            isActive={status === 'favorites'}
            onClick={() => { handleClick('favorites') }}
          >
            收藏
          </StyledButton>
        </StyledButtonGroup>
        {status === 'editing' && <AllEditingMemes />}
        {status === 'nopublic' && <AllPrivateMemeImage />}
        {status === 'ispublic' && <AllPublicMemeImage />}
        {status === 'favorites' && <AllFavorite />}
      </StyledMemeManagementWrapper>
    </StyledWrapper>
  )
}

export default Personal;
