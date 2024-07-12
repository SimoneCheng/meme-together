import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding-bottom: 50px;
  overflow-y: auto;
`;

export const StyledH1 = styled.h1`
  padding-top: 100px;
  font-weight: bolder;
`;

export const StyledStrong = styled.strong`
  background-color: #fe5656;
  color: black;
`;

export const StyledCanvasContainer = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledMemeEditorContainer = styled.div`
  display: flex;
  @media screen and (max-width: 900px) {
    margin-bottom: 24px;
  }
`;

export const StyledButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  button {
    margin-right: 16px;
  }
`;
