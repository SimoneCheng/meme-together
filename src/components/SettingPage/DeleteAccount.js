import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { alertDelete, alertError } from '../../utlis/alert';
import color from '../Styled/colorTheme';
import { deleteAllData, deleteAccount, reAuth } from '../../utlis/firebase';

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

function DeleteAccount() {
  const userData = useSelector((state) => state.userData);
  const password = useRef(null);

  const deleteTheUser = () => {
    reAuth(password.current.value)
      .then((res) => {
        if (!res) { 
          alertError(undefined, '密碼輸入錯誤！請重新輸入！'); 
        }
        if (res) {
          deleteAllData(userData.user_id)
            .then(() => {
              deleteAccount(password.current.value);
            })
        }
      })
  }

  return (
    <Container6>
      <Container7>刪除帳戶</Container7>
      <p>請輸入密碼：</p>
      <Input1 type="password" ref={password} />
      <br></br>
      <Button0 color={color} onClick={() => alertDelete(deleteTheUser)}>刪除帳戶</Button0>
    </Container6>
  )
}

export default DeleteAccount;