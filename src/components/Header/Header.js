import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Login from './Login';
import Signup from './Signup';
import { setUserData, setIsLoginDisplayed, setIsSignupDisplayed } from '../../redux/actions';
import color from '../../utlis/colorTheme';
import { nativeLogout, checkLoginStatus, } from '../../utlis/firebase';

import logo from '../../image/outline_bug_report_black_36dp.png';
import account from '../../image/outline_account_circle_black_36dp.png';
import setting from '../../image/outline_settings_black_36dp.png';

const Menu = styled.header`
 position: fixed;
 top: 0;
 left: 0;
 z-index: 999;
 width: 100%;
 height: 65px;
 background-color: ${props => props.color.color3.colorCode};
 box-shadow: 5px 5px 5px gray;
 @media screen and (max-width: 768px) {
    height: 60px;
 }
`;

const AccountImage = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

// ===== Desktop Navbar Layout ===== //
const NavDesktop = styled.nav`
 display: flex;
 width: 100%;
 height: 65px;
 @media screen and (max-width: 768px) {
   display: none;
 }
`;

const LogoDesktop = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-size: 16px;
  font-weight: bolder;
`;

const LogoImage = styled.img`
  height: 30px;
  width: 35px;
`;

const Ul2 = styled.ul`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;

const LiDesktop = styled.li`
  list-style: none;
  margin-right: 30px;
`;

const Button = styled.button`
  border: 1px ${props => props.color.color2.colorCode} solid;
  border-radius: 5px;
  color: ${props => props.color.color2.colorCode};
  background-color: ${props => props.color.color3.colorCode};
  font-size: 16px;
  padding: 5px 30px;
  cursor: pointer;
  :active {
    background-color: ${props => props.color.color2.colorCode};
    color: ${props => props.color.color3.colorCode};
  } 
`;

// ===== Monbile Navbar Layout ===== //
const NavMobile = styled.nav`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
  }
`;

const LogoMobile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 16px;
  font-weight: bolder;
`;

const Checkbox = styled.input`
  display: none;
  :checked~#menu {
  max-height: 100%;
  }
`;

const LabelBurger = styled.label`
  font-size: 30px;
`;

const MenuMobile = styled.div`
  max-height: 0;
  overflow: hidden;
  position: fixed;
  top: 60px;
  left: 0;
  background-color: white;
  width: 100%;
  transition: 0.8s linear;
  box-shadow: 5px 5px 5px gray;
`;

const LiMobile = styled.li`
  list-style: none;
  text-align: center;
  color: ${props => props.color.color2.colorCode};
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
`;

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
    console.log(userData);
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
          <MenuMobile id="menu">
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