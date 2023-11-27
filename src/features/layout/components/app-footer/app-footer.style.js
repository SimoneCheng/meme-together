import styled from "styled-components";
import { BsGithub } from 'react-icons/bs';
import { GoLinkExternal } from 'react-icons/go';

export const StyledWrapper = styled.div`
  background-color: #888;
  color: #fff;
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

export const StyledFooterInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledGithubLinkIcon = styled(BsGithub)`
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
      color: #ccc;
  }
`;

export const StyledGoLinkExternalIcon = styled(GoLinkExternal)`
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: 3px;
  &:hover {
      color: #ccc;
  }
`;
