import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import {
  setUserData,
  setIsLoginDisplayed,
  setIsSignupDisplayed,
} from '../../redux/actions';
import {
  nativeLogout,
  checkLoginStatus,
} from '../../utlis/firebase';
import color from '../Styled/colorTheme';
import {
  Menu,
  AccountImage,
  NavDesktop,
  LogoDesktop,
  LogoImage,
  Ul2,
  LiDesktop,
  Button,
  NavMobile,
  LogoMobile,
  Checkbox,
  LabelBurger,
  MenuMobile,
  LiMobile
} from '../Styled/Header';

import logo from '../../image/outline_bug_report_black_36dp.png';
import account from '../../image/outline_account_circle_black_36dp.png';
import setting from '../../image/outline_settings_black_36dp.png';

function Header() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const isLoginDisplayed = useSelector((state) => state.isLoginDisplayed);
  const isSignupDisplayed = useSelector((state) => state.isSignupDisplayed);
  const history = useHistory();

  useEffect(() => {
    return checkLoginStatus(dispatch, setUserData);
  }, []);

  const clickLoginButton = () => {
    dispatch(setIsLoginDisplayed(true));
  }

  const clickSignupButton = () => {
    dispatch(setIsSignupDisplayed(true));
  }

  const clickAccount = () => {
    if (userData) {
      history.push('/personal');
    } else {
      alert("尚未登入！");
    }
  }

  const clickSetting = () => {
    if (userData) {
      history.push('/setting')
    } else {
      alert("尚未登入！");
    }
  }

  const clickLogout = () => {
    nativeLogout()
      .then(function () {
        alert('登出成功！將跳轉至首頁！');
        history.push('/');
      });
  }

  const renderDesktopLoginAndSignupButton = () => {
    return (
      <Ul2>
        <LiDesktop><Button onClick={() => clickLoginButton()} color={color}>登入</Button></LiDesktop>
        <LiDesktop><Button onClick={() => clickSignupButton()} color={color}>註冊</Button></LiDesktop>
      </Ul2>
    )
  }

  const renderMobileLoginAndSignupButton = () => {
    return (
      <ul>
        <LiMobile onClick={() => clickLoginButton()} color={color}>登入</LiMobile>
        <LiMobile onClick={() => clickSignupButton()} color={color}>註冊</LiMobile>
      </ul>
    )
  }

  const renderDesktopLogoutAndMemberButton = () => {
    return (
      <Ul2>
        <LiDesktop><AccountImage src={account} onClick={() => clickAccount()}></AccountImage></LiDesktop>
        <LiDesktop><AccountImage src={setting} onClick={() => clickSetting()}></AccountImage></LiDesktop>
        <LiDesktop><Button onClick={() => clickLogout()} color={color}>登出</Button></LiDesktop>
      </Ul2>
    )
  }

  const renderMobileLogoutAndMemberButton = () => {
    return (
      <ul>
        <LiMobile color={color}><AccountImage src={account} onClick={() => clickAccount()}></AccountImage></LiMobile>
        <LiMobile color={color}><AccountImage src={setting} onClick={() => clickSetting()}></AccountImage></LiMobile>
        <LiMobile onClick={() => clickLogout()} color={color}>登出</LiMobile>
      </ul>
    )
  }

  return (
    <>
      <Menu color={color}>
        <NavDesktop>
          <LogoDesktop>
            <Link to='/'><span>MEME</span></Link>
            <Link to='/'><LogoImage alt='logo' src={logo}></LogoImage></Link>
            <Link to='/'><span>together</span></Link>
          </LogoDesktop>
          <ul>
            <LiDesktop><Link to="/explorememes"><Button color={color}>探索</Button></Link></LiDesktop>
          </ul>
          {userData ? renderDesktopLogoutAndMemberButton() : renderDesktopLoginAndSignupButton()}
        </NavDesktop>

        <NavMobile>
          <LogoMobile>
            <Link to='/'><span>MEME</span></Link>
            <Link to='/'><LogoImage alt='logo' src={logo}></LogoImage></Link>
            <Link to='/'><span>together</span></Link>
          </LogoMobile>
          <LabelBurger htmlFor="burger">&#9776;</LabelBurger>
          <Checkbox type="checkbox" id="burger" />
          <MenuMobile>
            <ul>
              <Link to="/explorememes"><LiMobile color={color}>探索</LiMobile></Link>
            </ul>
            {userData ? renderMobileLogoutAndMemberButton() : renderMobileLoginAndSignupButton()}
          </MenuMobile>
        </NavMobile>
      </Menu>

      {isLoginDisplayed ? <Login /> : ""}
      {isSignupDisplayed ? <Signup /> : ""}
    </>
  );
}

export default Header;