import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { setUserData } from '../../redux/actions';
import {
  nativeLogout,
  checkLoginStatus,
} from '../../utlis/firebase';
import { alertSuccess, alertError } from '../../utlis/alert';
import color from '../Styled/colorTheme';
import {
  Menu,
  AccountImage,
  NavDesktop,
  LogoDesktop,
  LogoImage,
  Ul1,
  Ul2,
  LiDesktop,
  Button,
  NavMobile,
  LogoMobile,
  LabelBurger,
  MenuMobile,
  LiMobile
} from '../Styled/Header';

import logo from '../../image/outline_bug_report_black_36dp.png';
import account from '../../image/outline_account_circle_black_36dp.png';
import setting from '../../image/outline_settings_black_36dp.png';

import { useDisclosure } from '@/hooks';
import { LoginDialog, SignupDialog } from '@/features/auth/components';

function Header() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const [isMobileNavBarDisplayed, setIsMobileNavBarDisplayed] = useState(false);
  const history = useHistory();

  const loginDialog = useDisclosure();
  const signupDialog = useDisclosure();

  useEffect(() => {
    checkLoginStatus(dispatch, setUserData);
  }, []);

  const clickAccount = () => {
    if (userData) {
      history.push('/personal');
    } else {
      alertError(undefined, "尚未登入！");
    }
  }

  const clickSetting = () => {
    if (userData) {
      history.push('/setting')
    } else {
      alertError(undefined, "尚未登入！");
    }
  }

  const clickLogout = () => {
    nativeLogout()
      .then(function () {
        alertSuccess('登出成功！跳轉至首頁！');
        history.push('/');
      });
  }

  const renderDesktopLoginAndSignupButton = () => {
    return (
      <Ul2>
        <LiDesktop><Button onClick={loginDialog.onOpen} color={color}>登入</Button></LiDesktop>
        <LiDesktop><Button onClick={signupDialog.onOpen} color={color}>註冊</Button></LiDesktop>
      </Ul2>
    )
  }

  const renderMobileLoginAndSignupButton = () => {
    return (
      <ul>
        <LiMobile onClick={() => { loginDialog.onOpen(); setIsMobileNavBarDisplayed(false); }} color={color}>登入</LiMobile>
        <LiMobile onClick={() => { signupDialog.onOpen(); setIsMobileNavBarDisplayed(false); }} color={color}>註冊</LiMobile>
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
        <LiMobile color={color} onClick={() => { clickAccount(); setIsMobileNavBarDisplayed(false); }}><AccountImage src={account}></AccountImage></LiMobile>
        <LiMobile color={color} onClick={() => { clickSetting(); setIsMobileNavBarDisplayed(false); }}><AccountImage src={setting}></AccountImage></LiMobile>
        <LiMobile onClick={() => { clickLogout(); setIsMobileNavBarDisplayed(false); }} color={color}>登出</LiMobile>
      </ul>
    )
  }

  const clickHamburgerMenu = () => {
    if (isMobileNavBarDisplayed === false) {
      setIsMobileNavBarDisplayed(true);
    } else {
      setIsMobileNavBarDisplayed(false);
    }
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
          <Ul1>
            <LiDesktop><Link to="/explorememes"><Button color={color}>探索</Button></Link></LiDesktop>
            <LiDesktop><Link to="/templates"><Button color={color}>創作</Button></Link></LiDesktop>
            {userData ? <LiDesktop><Link to="/uploadtemplate"><Button color={color}>貢獻模板</Button></Link></LiDesktop> : ""}
          </Ul1>
          {userData ? renderDesktopLogoutAndMemberButton() : renderDesktopLoginAndSignupButton()}
        </NavDesktop>

        <NavMobile>
          <LogoMobile>
            <Link to='/'><span>MEME</span></Link>
            <Link to='/'><LogoImage alt='logo' src={logo}></LogoImage></Link>
            <Link to='/'><span>together</span></Link>
          </LogoMobile>
          <LabelBurger onClick={() => clickHamburgerMenu()} htmlFor="burger">&#9776;</LabelBurger>
          <MenuMobile isDisplayed={isMobileNavBarDisplayed}>
            <ul>
              <Link to="/explorememes" onClick={() => setIsMobileNavBarDisplayed(false)}><LiMobile color={color}>探索</LiMobile></Link>
              <Link to="/templates" onClick={() => setIsMobileNavBarDisplayed(false)}><LiMobile color={color}>創作</LiMobile></Link>
              {userData ? <Link to="/uploadtemplate" onClick={() => setIsMobileNavBarDisplayed(false)}><LiMobile color={color}>貢獻模板</LiMobile></Link> : ""}
            </ul>
            {userData ? renderMobileLogoutAndMemberButton() : renderMobileLoginAndSignupButton()}
          </MenuMobile>
        </NavMobile>
      </Menu>
      {loginDialog.isOpen && (
        <LoginDialog
          isOpen={loginDialog.isOpen}
          onClose={loginDialog.onClose}
        />
      )}
      {signupDialog.isOpen && (
        <SignupDialog
          isOpen={signupDialog.isOpen}
          onClose={signupDialog.onClose}
        />
      )}
    </>
  );
}

export default Header;