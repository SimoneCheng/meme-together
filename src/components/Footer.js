import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { GoLinkExternal } from 'react-icons/go';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #888;
  color: white;
  font-size: 0.8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  @media screen and (max-width: 500px) {
      flex-direction: column;
      padding-top: 5px;
      padding-bottom: 5px;
  }
`;

const StyledFooterInfo = styled.div`
  display: flex;
  align-items: center;
`;

const GithubLink = styled(BsGithub)`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
      color: #ccc;
  }
`;

const LinkExternal = styled(GoLinkExternal)`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 3px;
  &:hover {
      color: #ccc;
  }
`;

function Footer() {
    return (
        <Wrapper>
            <StyledFooterInfo>
                Open source illustrations kit<Link to={{ pathname: "https://illlustrations.co/" }} target="_blank"><LinkExternal /></Link>，
            </StyledFooterInfo>
            <StyledFooterInfo>
                Copyright © Simone Cheng, 2021<Link to={{ pathname: "https://github.com/SimoneCheng/meme-together" }} target="_blank"><GithubLink /></Link>
            </StyledFooterInfo>
        </Wrapper>
    )
}

export default Footer;