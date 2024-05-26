import styled from "styled-components";
import { FaPencilAlt, FaMousePointer } from 'react-icons/fa';
import {
    IoTriangleOutline,
    IoSquareOutline,
    IoRadioButtonOffOutline
} from 'react-icons/io5/index.esm';

const Container0 = styled.div`
  margin-bottom: 30px;
  white-space: pre-line;
`;

const Container1 = styled.div`
  margin-top: 8px
`;

const Button0 = styled.button`
  border-radius: 10px;
  border: 2px solid #ccc;
  font-size: 1rem;
  padding: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover{
      border: 2px solid #056;
  }
`;

const Button1 = styled.button`
  border: 2px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  padding: 8px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 10px;
  &:hover{
      border: 2px solid #056;
  }
`;

const Input0 = styled.input`
  cursor: pointer;
`;

const PencilBtn = styled(FaPencilAlt)`
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

const PointerBtn = styled(FaMousePointer)`
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

const RectBtn = styled(IoSquareOutline)`
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

const TriangleBtn = styled(IoTriangleOutline)`
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

const CircleBtn = styled(IoRadioButtonOffOutline)`
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

export {
    Container0,
    Container1,
    Button0,
    Button1,
    Input0,
    PencilBtn,
    PointerBtn,
    RectBtn,
    CircleBtn,
    TriangleBtn
}