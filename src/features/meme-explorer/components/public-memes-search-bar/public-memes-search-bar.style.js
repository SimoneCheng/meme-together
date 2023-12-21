import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  width: 400px;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 524px) {
    width: 100%;
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  border: 3px solid #056;
  border-right: none;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  outline: none;
  &:focus{
    color: #056;
  }
`;

export const StyledButton = styled.button`
  width: 40px;
  height: 36px;
  border: 1px solid #056;
  background: #056;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
`;
