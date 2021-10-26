import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setIsLoginDisplayed } from '../../redux/actions';
import color from '../../utlis/colorTheme';
import { nativeLogin } from '../../utlis/firebase';
import fLogo from '../../image/f_logo_RGB-White_58.png';

const Container0 = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container1 = styled.div`
  background-color: white;
  padding: 60px 30px 30px 30px;
  border-radius: 10px;
  width: 20%;
  position: relative;
`;

const HrText = styled.div`
  position: relative;
  left: 45%;
  top: -20px;
  background-color: white;
  width: 20px;
  padding-left: 5px;
`;

const Input1 = styled.input`
  width: 95%;
  margin: 20px auto;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #ccc;
  :focus{
    background-color: rgba(0, 0, 0, 0.05);
    outline: none;
  }
`;

const LoginButton = styled.button`
  background-color: ${props => props.color.color1.colorCode};
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 5px;
  cursor: pointer;
  padding: 6px 10px;
  width: 100%;
  margin-bottom: 20px;
`;

const FBLoginButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #3b5998;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  width: 100%;
`;

const FBLogoImg = styled.img`
  height: 30px;
  margin-right: 10px;
`;

const CloseButton = styled.span`
  :hover {
    cursor: pointer;
    :before, :after {
    opacity: 1;
    }
  }
  :before, :after {
    content: '';
    position: absolute;
    height: 3px;
    width: 25px;
    top: 20px;
    right: 10px;
    background: rgb(255, 0, 0);
    opacity: 0.3;
  }
  :before {
    --webkit-transform: rotate(45deg);
    --moz-transform: rotate(45deg);
    --ms-transform: rotate(45deg);
    --o-transform: rotate(45deg);
    transform: rotate(45deg);;
  }
  :after {
    --webkit-transform: rotate(-45deg);
    --moz-transform: rotate(-45deg);
    --ms-transform: rotate(-45deg);
    --o-transform: rotate(-45deg);
    transform: rotate(-45deg);;
  }
`;

function Login() {
  const dispatch = useDispatch();
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  const clickCloseButton = () => {
    dispatch(setIsLoginDisplayed(false));
  }
  const clickLogin = () => {
    nativeLogin(loginEmail.current.value, loginPassword.current.value);
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
          <hr></hr>
          <HrText>or</HrText>
          <FBLoginButton><FBLogoImg alt="flogo" src={fLogo}></FBLogoImg>使用 Facebook 帳號登入</FBLoginButton>
        </Container1>
      </Container0>
  )
}

export default Login;