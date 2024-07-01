import styled from "styled-components";
import { Button } from "@/components/button";

export const StyledButton = styled(Button)`
  box-shadow: 0 0 3px white;
  border-radius: 10px;
  width: 100%;
  height: 250px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  &:hover{
    box-shadow: 0 0 10px 3px white;
  }
  @media screen and (max-width: 850px) {
    height: 220px;
  }
  @media screen and (max-width: 760px) {
    height: 200px;
  }
  @media screen and (max-width: 700px) {
    height: 250px;
  }
  @media screen and (max-width: 600px) {
    height: 200px;
  }
  @media screen and (max-width: 500px) {
    height: 150px;
  }
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 50px 50px 0 50px;
  padding-bottom: 50px;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(3, 220px);
    grid-gap: 20px;
  }
  @media screen and (max-width: 760px) {
    grid-template-columns: repeat(3, 200px);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 200px);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 150px);
  }
`;

export const StyledNoContentWrapper = styled.div`
  color: #fff;
  font-size: 2rem;
  padding-top: 50px;
  text-align: center;
`;
