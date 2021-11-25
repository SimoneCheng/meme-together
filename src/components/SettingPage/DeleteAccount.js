import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { deleteAllData, deleteAccount, reAuth } from '../../utlis/firebase';
import { alertDelete, alertError } from '../../utlis/alert';
import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  Input1,
  Button0
} from '../Styled/SettingPage/Common';

function DeleteAccount() {
  const userData = useSelector((state) => state.userData);
  const password = useRef(null);

  const deleteTheUser = (e) => {
    e.preventDefault();
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
    <Container0>
      <Container1>刪除帳戶</Container1>
      <form>
        <p>請輸入密碼：</p>
        <Input1 type="password" ref={password} autoComplete="on" />
        <br></br>
        <Button0 color={color} onClick={(e) => { alertDelete(() => deleteTheUser(e)); }}>刪除帳戶</Button0>
      </form>
    </Container0>
  )
}

export default DeleteAccount;