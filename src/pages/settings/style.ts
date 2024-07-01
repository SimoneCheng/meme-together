import styled from "styled-components";

export const StyledWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: calc(100vh - 100px);
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  width: 800px;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
