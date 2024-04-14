import styled from "styled-components";

export const StyledSearchAndSortWrapper = styled.div`
  display: flex;
  width: 850px;
  justify-content: space-between;
  @media screen and (max-width: 1024px) {
    width: 690px;
  }
  @media screen and (max-width: 768px) {
    width: 545px;
    flex-direction: column;
  }
  @media screen and (max-width: 660px) {
    width: 445px;
  }
  @media screen and (max-width: 524px) {
    width: 345px;
  }
`;

export const StyledPublicMemeWrapper = styled.div`
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

export const StyledPublicMemeImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledAllPublicMemesWrapper = styled.div`
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

export const StyledLoadingWrapper = styled.div`
  margin-top: 100px;
`

export const StyledSelect = styled.select`
  border: 0;
  outline: 0;
  font: inherit;
  height: 2rem;
  padding: 0 1rem 0 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;
