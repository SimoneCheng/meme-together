import styled from "styled-components";

export const StyledWrapper = styled.div`
  padding-top: 100px;
  min-height: calc(100vh - 100px);
  background-color: #ffc349;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledMemeManagementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 0 3px grey;
  border-radius: 10px;
  margin-bottom: 30px;
  @media screen and (max-width: 970px) {
  width: calc(100% - 100px);
  }
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px;
  width: 750px;
  margin-bottom: 20px;
  height: 30px;
  @media screen and (max-width: 970px) {
    width: calc(100% - 140px);
  }
  @media screen and (max-width: 680px) {
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    padding: 20px 0 0 0;
  }
  @media screen and (max-width: 425px) {
    font-size: 14px;
  }
`;

type StyledButtonProps = {
  isActive: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  background: transparent;
  border: none;
  font-size: 1.125rem;
  cursor: pointer;
  border-bottom: ${props => props.isActive ? "4px solid #056" : "4px solid transparent"};
  font-weight: ${props => props.isActive ? "bold" : "normal"};
  transition: border-width 0.3s linear;
  @media screen and (max-width: 680px) {
    margin-bottom: 10px;
  }
`;
