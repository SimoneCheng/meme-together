import styled from "styled-components";

export const StyledInput = styled.input`
  width: 300px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

export const StyledButton = styled.button`
  background-color: ${props => props.color.color1.colorCode};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 16px;
  margin-left: 16px;
`;
