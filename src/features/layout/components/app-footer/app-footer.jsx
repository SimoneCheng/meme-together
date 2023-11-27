import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledWrapper,
  StyledFooterInfo,
  StyledGithubLinkIcon,
  StyledGoLinkExternalIcon
} from './app-footer.style';

const AppFooter = () => {
  return (
    <StyledWrapper>
      <StyledFooterInfo>
        Open source illustrations kit
        <Link
          to="https://illlustrations.co/"
          target="_blank"
        >
          <StyledGoLinkExternalIcon />
        </Link>
        ，
        Copyright © Simone Cheng, 2021
        <Link to="https://github.com/SimoneCheng/meme-together" target="_blank">
          <StyledGithubLinkIcon />
        </Link>
      </StyledFooterInfo>
    </StyledWrapper>
  );
};

export default AppFooter;
