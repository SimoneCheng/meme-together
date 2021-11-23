import React, { useRef } from 'react';

import { updatePassword } from '../../utlis/firebase';
import { alertError } from '../../utlis/alert';
import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  Input1,
  Button0
} from '../Styled/SettingPage/Common';

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
    <Container0>
      <Container1>修改密碼</Container1>
      <p>請輸入舊密碼：</p>
      <Input1 type="password" ref={oldPassword} />
      <p>請輸入新密碼：</p>
      <Input1 type="password" ref={newPassword1} />
      <p>請再輸入一次新密碼：</p>
      <Input1 type="password" ref={newPassword2} />
      <br></br>
      <Button0 color={color} onClick={() => clickUpdatePassword()}>送 出</Button0>
    </Container0>
  )
}

export default Password;