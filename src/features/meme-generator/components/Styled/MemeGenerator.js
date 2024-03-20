import styled from "styled-components";
import { FaShapes } from 'react-icons/fa';
import {
  MdTextFields,
  MdEdit
} from 'react-icons/md';

const Container0 = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.color.color3.colorCode};
  padding-bottom: 50px;
  overflow-y: auto;
`;

const Container1 = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  color: #ccc;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin-right: 20px;
  padding: 10px;
`;

const Container3 = styled.div`
  width: 170px;
`;

const Container4 = styled.div`
  display: flex;
  align-self: flex-end;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-self: center;
  }
`;

const Container5 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container6 = styled.div`
  border: ${props => props.canvas !== '' && props.canvas !== null ? '2px solid #ccc' : 'none'}
`;

const H1 = styled.h1`
  padding-top: 100px;
  font-weight: bolder;
`;

const Strong = styled.strong`
  background-color: ${props => props.color.color4.colorCode};
  color: black;
`;

const TextEditorBtn = styled(MdTextFields)`
  cursor: pointer;
  color: ${props => props.status === 'text' ? '#056' : 'inherit'};
  margin-bottom: 10px;
  &:hover{
    color: #056;
  }
`;

const ShapeEditorBtn = styled(FaShapes)`
  cursor: pointer;
  color: ${props => props.status === 'shape' ? '#056' : 'inherit'};
  margin-bottom: 10px;
  &:hover{
    color: #056;
  }
`;

const DrawEditorBtn = styled(MdEdit)`
  cursor: pointer;
  color: ${props => props.status === 'draw' ? '#056' : 'inherit'};
  &:hover{
    color: #056;
  }
`;

export {
  Container0,
  Container1,
  Container2,
  Container3,
  Container4,
  Container5,
  Container6,
  H1,
  Strong,
  TextEditorBtn,
  ShapeEditorBtn,
  DrawEditorBtn
}
