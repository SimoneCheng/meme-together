import styled from "styled-components";
import {
  MdSend,
  MdEdit
} from 'react-icons/md/index.esm';
import {
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
  IoIosTrash
} from 'react-icons/io/index.esm';
import { Button } from "@/components/button";

export const StyledSection = styled.section`
  background-color: #fff;
  padding: 10px 30px 30px 30px;
`;

export const StyledAddCommentInputWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const StyledAddCommentInputButton = styled(Button)`
  padding: 4px 8px;
  margin-left: 8px;
`;

export const StyledSendIcon = styled(MdSend)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
    color: #056;
  }
`;

export const StyledTrashIcon = styled(IoIosTrash)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
    color: #056;
  }
`;

export const StyledEditIcon = styled(MdEdit)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
      color: #056;
  }
`;

export const StyledCheckmarkCircleIcon = styled(IoIosCheckmarkCircle)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
    color: #00EC00;
  }
`;

export const StyledCloseCircleIcon = styled(IoIosCloseCircle)`
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  &:hover{
    color: red;
  }
`;

export const StyledCommentInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledCommentCreatedTime = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
`;

export const StyledComment = styled.p`
  padding: 10px 0;
  word-break: break-word;
  margin: 0;
`;

export const StyledCommentWrapper = styled.div`
  margin-bottom: 24px;
`;
