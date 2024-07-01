import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledHotMemesDiv = styled.div`
  background-color: #056;
  padding-top: 30px;
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

export const AllHotMemesImg = styled.div`
  display: flex;
  overflow-x: auto;
  margin-right: 50px;
  margin-left: 50px;
  min-height: 250px;
  align-items: center;
`;

export const HotMemesTitle = styled.h1`
  color: white;
  margin-left: 50px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export const LinkToMoreMemes = styled.div`
  width: fit-content;
  margin-top: 30px;
  margin-bottom: 20px;
  border-bottom: 2px solid white;
  color: white;
  position: relative;
  left: 50%;
  :hover {
      background-color: white;
      color: #056;
      cursor: pointer;
  }
`;

export const EachMemeLink = styled(Link)`
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-right: 30px;
`;

export const EachMemeImg = styled.img`
  height: 250px;
  object-fit: fill;
  :hover {
    box-shadow: 0 0 10px 3px white;
  }
`;
