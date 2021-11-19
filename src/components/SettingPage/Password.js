import React, { useRef } from 'react';
import styled from 'styled-components';

import { updatePassword } from '../../utlis/firebase';
import { alertError } from '../../utlis/alert';
import color from '../Styled/colorTheme';


const Container6 = styled.div`
  flex: 1;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    padding-left: 0px;
    padding-top: 50px;
    width: calc(100% - 50px);
  }
`;

const Container7 = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 5px 0;
  border-bottom: 5px solid #056;
  margin-bottom: 20px;
`;

const Input1 = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  width: 80%;
  font-size: 1rem;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
  @media screen and (max-width: 768px) {
    width: calc(100% - 30px);
  }
`;

const Button0 = styled.div`
  background-color: ${props => props.color.color1.colorCode};
  border: 2px solid transparent;
  border-radius: 10px;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 18px;
  align-self: flex-start;
  :hover{
    border: 2px solid black;
  }
`;

function Password() {
    const oldPassword = useRef(null);
    const newPassword1 = useRef(null);
    const newPassword2 = useRef(null);

    const clickUpdatePassword = () => {
        if (oldPassword.current.value === "") {
            alertError(undefined, '尚未輸入舊密碼！');
            return;
        } else if (newPassword1.current.value === "" || newPassword2.current.value === "") {
            alertError(undefined, '尚未輸入新密碼！');
            return;
        } else if (newPassword2.current.value !== newPassword1.current.value) {
            alertError(undefined, '［請再輸入一次新密碼］欄位有誤！');
            return;
        } else {
            updatePassword(oldPassword.current.value, newPassword1.current.value);
        }
    }

    return (
        <Container6>
            <Container7>修改密碼</Container7>
            <p>請輸入舊密碼：</p>
            <Input1 type="password" ref={oldPassword} />
            <p>請輸入新密碼：</p>
            <Input1 type="password" ref={newPassword1} />
            <p>請再輸入一次新密碼：</p>
            <Input1 type="password" ref={newPassword2} />
            <br></br>
            <Button0 color={color} onClick={() => clickUpdatePassword()}>送 出</Button0>
        </Container6>
    )
}

export default Password;