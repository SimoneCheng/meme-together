import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  font-size: 1rem;
  @media screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

export const StyledImg = styled.img`
  width: 400px;
  margin-right: 50px;
  position: sticky;
  top: 100px;
  @media screen and (max-width: 950px) {
    width: 350px;
  }
  @media screen and (max-width: 850px) {
    width: 300px;
  }
  @media screen and (max-width: 750px) {
    width: 500px;
    margin-right: 0px;
    position: initial;
  }
  @media screen and (max-width: 570px) {
    width: 400px;
  }
  @media screen and (max-width: 425px) {
    width: 300px;
  }
`;

export const StyledSection = styled.section`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 5px;
`;

export const StyledSectionsWrapper = styled.div`
  width: 400px;
  @media screen and (max-width: 950px) {
    width: 350px;
  }
  @media screen and (max-width: 850px) {
    width: 300px;
  }
  @media screen and (max-width: 750px) {
    width: 500px;
    margin-right: 0px;
  }
  @media screen and (max-width: 570px) {
    width: 400px;
  }
  @media screen and (max-width: 425px) {
    width: 300px;
  }
`;

export const StyledContext = styled.p`
  padding-top: 30px;
  padding-bottom: 30px;
  min-height: 100px;
  white-space: pre-line;
  word-break: break-word;
`;

export const StyledTag = styled.span`
  background-color: #E0E0E0;
  border-radius: 10px;
  padding: 2px 5px;
  display: inline-block;
  margin-right: 8px;
`;

export const StyledContextBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
