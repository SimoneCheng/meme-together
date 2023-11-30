import styled from "styled-components";

export const StyledFormControl = styled.div`
  width: 300px;
`;

export const StyledFormLabel = styled.label`
  margin-top: 8px;
  margin-bottom: 8px;
  display: block;
`;

export const StyledButton = styled.button`
  background-color: ${props => props.color.color1.colorCode};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 16px;
  margin-left: 16px;
  color: inherit;
`;

