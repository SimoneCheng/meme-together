import styled from "styled-components";

export const StyledTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  font-size: 1rem;
  resize: none;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;
