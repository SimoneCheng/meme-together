import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const WarningMessage = styled.div`
  font-size: 40px;
  font-family: 'Comic Sans MS';
  background-color: #056;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
`;

export const GobackToHomepageText = styled.div`
  margin-top: 30px;
  font-size: 60px;
  @media screen and (max-width: 375px) {
    font-size: 40px;
  }
`;

export const LinkToHomepage = styled(Link)`
  margin-top: 30px;
  background-color: #ffc349;
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid transparent;
  &:hover{
      border: 2px solid black;
  }
`;

export const Img404 = styled.img`
  width: 100%;
`;
