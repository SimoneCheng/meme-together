import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 10px;
  margin: 0 auto;
  width: 800px;
  @media screen and (max-width: 850px) {
    width: auto;
    margin: 0 30px;
  }
  @media screen and (max-width: 650px) {
    font-size: 0.8rem;
  }
`;

export const StyledImg = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 10px #ccc;
  @media screen and (max-width: 650px) {
    width: 100px;
    height: 100px;
  }
`;
