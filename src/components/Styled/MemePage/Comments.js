import styled from "styled-components";
import { MdSend, MdEdit } from 'react-icons/md';
import {
    IoIosCheckmarkCircle,
    IoIosCloseCircle,
    IoIosTrash
} from 'react-icons/io';

const Container0 = styled.div`
  background-color: #fff;
  padding: 10px 30px 1px 30px;
`;

const Container1 = styled.div`
  font-size: 1rem;
  width: 100%;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Container3 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Container4 = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  word-break: break-word;
`;

const Container5 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container6 = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
`;

const Input0 = styled.input`
  width: -webkit-fill-available;
  padding: 10px;
  border-radius: 50px;
  border: 2px solid #ccc;
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const Send = styled(MdSend)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  position: relative;
  bottom: 38px;
  right: 10px;
  &:hover{
      color: #056;
  }
`;

const TrachCan = styled(IoIosTrash)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
    color: #056;
  }
`;

const EditPen = styled(MdEdit)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
      color: #056;
  }
`;

const SaveComment = styled(IoIosCheckmarkCircle)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
      color: #00EC00;
  }
`;

const CloseEdit = styled(IoIosCloseCircle)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
      color: red;
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
    Input0,
    Send,
    TrachCan,
    EditPen,
    SaveComment,
    CloseEdit
}