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

  const clickLogin = (e) => {
    e.preventDefault();
    nativeLogin(loginEmail.current.value, loginPassword.current.value)
      .then((res) => {
        res && dispatch(setIsLoginDisplayed(false));
      });
  }

  return (
    <Container0>
      <Container1>
        <CloseButton onClick={() => { clickCloseButton() }}></CloseButton>
        <form>
          <div>
            <div>電子信箱</div>
            <Input1 type="email" placeholder="email" defaultValue="456@456.com" ref={loginEmail} autoComplete="on" />
          </div>
          <div>
            <div>密碼</div>
            <Input1 type="password" placeholder="password" defaultValue="123456"  ref={loginPassword} autoComplete="on" />
          </div>
          <LoginButton color={color} onClick={(e) => { clickLogin(e); }}>登入</LoginButton>
        </form>
      </Container1>
    </Container0>
  )
}

export default Login;