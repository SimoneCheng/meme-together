import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  width: 830px;
  margin-bottom: 20px;
  @media screen and (max-width: 970px) {
    width: calc(100% - 140px);
  }
  @media screen and (max-width: 680px) {
    flex-direction: column;
  }
`;

export const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledImg = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 10px #ccc;
  @media screen and (max-width: 680px) {
    margin-bottom: 20px;
  }
`;
