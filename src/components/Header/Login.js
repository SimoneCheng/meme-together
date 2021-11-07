import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { setIsLoginDisplayed } from '../../redux/actions';
import { nativeLogin } from '../../utlis/firebase';
import color from '../Styled/colorTheme';
import {
  Container0,
  Container1,
  Input1,
  LoginButton,
  CloseButton,
} from '../Styled/Popup';

function Login() {
  const dispatch = useDispatch();
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  
  const clickCloseButton = () => {
    dispatch(setIsLoginDisplayed(false));
  }
  
  const clickLogin = () => {
    nativeLogin(loginEmail.current.value, loginPassword.current.value)
      .then(() => {
        dispatch(setIsLoginDisplayed(false));
      });
  }

  return (
    <Container0>
      <Container1>
        <CloseButton onClick={() => { clickCloseButton() }}></CloseButton>
        <div>
          <div>電子信箱</div>
          <Input1 type="email" placeholder="email" ref={loginEmail} />
        </div>
        <div>
          <div>密碼</div>
          <Input1 type="password" placeholder="password" ref={loginPassword} />
        </div>
        <LoginButton color={color} onClick={() => { clickLogin(); }}>登入</LoginButton>
      </Container1>
    </Container0>
  )
}

export default Login;