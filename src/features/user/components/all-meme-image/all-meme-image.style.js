import styled from "styled-components";

export const StyledNoContentWrapper = styled.div`
  width: 810px;
  text-align: center;
  padding: 30px;
  font-size: 2rem;
  @media screen and (max-width: 810px) {
    width: 100%;
  }
`;

export const StyledAllMemeImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 30px;
  margin: 0 30px 30px 30px;
  @media screen and (max-width: 970px) {
    grid-template-columns: repeat(2, 350px);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 300px);
  }
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 250px);
  }
  @media screen and (max-width: 680px) {
    grid-template-columns: repeat(1, 400px);
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: repeat(1, 350px);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 300px);
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: repeat(1, 250px);
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 200px);
  }
`;

export const StyledMemeImageWrapper = styled.div`
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  position: relative;
  bottom: 0;
  transition: bottom 0.3s linear;
  &:hover{
    box-shadow: 0 0 10px 2px grey;
    bottom: 10px;
  }
`;

export const StyledImg = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const StyledWrapper = styled.div`
  padding: 0 20px 20px 20px;
`;
