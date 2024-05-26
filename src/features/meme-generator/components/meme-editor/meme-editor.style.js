import styled from 'styled-components';
import {
  IoTriangleOutline,
  IoSquareOutline,
  IoRadioButtonOffOutline
} from 'react-icons/io5/index.esm';

export const StyledContainer = styled.div`
  margin-bottom: 30px;
  white-space: pre-line;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input`
  cursor: pointer;
`;

export const StyledRectButton = styled(IoSquareOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  margin-right: 10px;
  background-color: #EFEFEF;
  border: 2px solid #ccc;
  border-radius: 10px;
  &:hover{
    border: 2px solid #056;
  }
`;

export const StyledTriangleButton = styled(IoTriangleOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  background-color: #EFEFEF;
  border: 2px solid #ccc;
  border-radius: 10px;
  &:hover{
    border: 2px solid #056;
  }
`;

export const StyledCircleButton = styled(IoRadioButtonOffOutline)`
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  margin-right: 10px;
  background-color: #EFEFEF;
  border: 2px solid #ccc;
  border-radius: 10px;
  &:hover{
    border: 2px solid #056;
  }
`;

export const StyledEditorContainer = styled.div`
  width: 200px;
  margin: 0 16px;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled.button`
  cursor: pointer;
  color: ${props => props.isActive ? '#056' : 'inherit'};
  margin-bottom: 10px;
  padding: 8px;
  &:hover{
    color: #056;
  }
`;
