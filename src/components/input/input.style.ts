import styled from "styled-components";

export const StyledInput = styled.input`
  color: inherit;
  width: 100%;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
  &::-ms-reveal,
  &::-webkit-textfield-decoration-container,
  &::-webkit-credentials-auto-fill-button {
    visibility: hidden;
    display: none;
    pointer-events: none;
  }

  &[data-variant="unstyled"] {
    border: none;
    background-color: transparent;
  }

  &[data-variant="outline"] {
    border-radius: 10px;
    border: 2px solid #ccc;
    :focus{
      background-color: rgba(0, 0, 0, 0.05);
      outline: none;
    }
  }
`;
