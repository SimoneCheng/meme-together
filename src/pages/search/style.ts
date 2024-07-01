import styled from 'styled-components';

export const StyledWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 50px;
  background-color: #ffc349;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledSearchedMemesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 45px;
  margin-top: 45px;
  margin-bottom: 45px;
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
