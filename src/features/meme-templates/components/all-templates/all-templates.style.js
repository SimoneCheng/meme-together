import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledAllTemplatesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 45px;
  margin-top: 45px;
  padding-bottom: 45px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 200px);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 660px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media screen and (max-width: 524px) {
    grid-template-columns: repeat(1, 250px);
  }
`;

export const StyledTemplatesItemLink = styled(Link)`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 250px;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
    bottom: 10px;
  }
  @media screen and (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
  @media screen and (max-width: 660px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 524px) {
    width: 250px;
    height: 250px;
  }
`;

export const StyledTemplateItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledLoadingWrapper = styled.div`
  margin-top: 100px;
`
