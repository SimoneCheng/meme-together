import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// store
import { setUserData } from "@/redux/actions";
// api
import { checkLoginStatus, nativeLogout } from "@/features/auth/api";
// components
import { LoginDialog, SignupDialog } from "@/features/auth/components";
// hooks
import { useDisclosure } from "@/hooks";
// utils
import { alertError, alertSuccess } from "@/utlis/alert";
// image
import logo from '@/image/outline_bug_report_black_36dp.png';
import account from '@/image/outline_account_circle_black_36dp.png';
import setting from '@/image/outline_settings_black_36dp.png';
// styles
import color from "@/components/Styled/colorTheme";
import {
  StyledHeader,
  StyledDesktopNav,
  StyledLogoLink,
  StyledDesktopUl,
  StyledButtonLink,
  StyledIconButton,
  StyledMobileNav,
  StyledSpan,
  StyledMobileUl,
  StyledMobileLink,
  StyledMobileButton
} from "./app-header.style";

const AppHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector((state) => state.userData);
  const mobileNav = useDisclosure();
  const loginDialog = useDisclosure();
  const signupDialog = useDisclosure();

  useEffect(() => {
    checkLoginStatus((user) => {
      dispatch(setUserData(user));
    });
  }, [dispatch]);

  const handleAccountClick = () => {
    if (!userData) return alertError(undefined, '尚未登入');
    if (mobileNav.isOpen) mobileNav.onClose();
    history.push('/personal');
  }

  const handleSettingClick = () => {
    if (!userData) return alertError(undefined, "尚未登入！");
    if (mobileNav.isOpen) mobileNav.onClose();
    history.push('/setting');
  }

  const handleLogoutClick = () => {
    nativeLogout().then(() => {
      alertSuccess('登出成功！跳轉至首頁！');
      if (mobileNav.isOpen) mobileNav.onClose();
      history.push('/');
    });
  }

  return (
    <>
      <StyledHeader color={color}>
        <StyledDesktopNav>
          <StyledLogoLink to='/'>
            <span>MEME</span>
            <img
              alt="logo"
              src={logo}
              height="30px"
              width="35px"
            />
            <span>together</span>
          </StyledLogoLink>
          <StyledDesktopUl>
            <li>
              <StyledButtonLink to="/explorememes" color={color}>
                探索
              </StyledButtonLink>
            </li>
            <li>
              <StyledButtonLink to="/templates" color={color}>
                創作
              </StyledButtonLink>
            </li>
            {userData && (
              <li>
                <StyledButtonLink to="/uploadtemplate" color={color}>
                  貢獻模板
                </StyledButtonLink>
              </li>
            )}
          </StyledDesktopUl>
          {userData ? (
            <StyledDesktopUl>
              <li>
                <StyledIconButton type="button" onClick={handleAccountClick}>
                  <img
                    alt="account"
                    src={account}
                    width="30px"
                    height="30px"
                  />
                </StyledIconButton>
              </li>
              <li>
                <StyledIconButton type="button" onClick={handleSettingClick}>
                  <img
                    alt="setting"
                    src={setting}
                    width="30px"
                    height="30px"
                  />
                </StyledIconButton>
              </li>
              <li>
                <StyledButtonLink
                  as="button"
                  type="button"
                  onClick={handleLogoutClick}
                  color={color}
                >
                  登出
                </StyledButtonLink>
              </li>
            </StyledDesktopUl>
          ) : (
            <StyledDesktopUl>
              <li>
                <StyledButtonLink
                  as="button"
                  type="button"
                  onClick={loginDialog.onOpen}
                  color={color}
                >
                  登入
                </StyledButtonLink>
              </li>
              <li>
                <StyledButtonLink
                  as="button"
                  type="button"
                  onClick={signupDialog.onOpen}
                  color={color}
                >
                  註冊
                </StyledButtonLink>
              </li>
            </StyledDesktopUl>
          )}
        </StyledDesktopNav>
        <StyledMobileNav>
          <StyledLogoLink to='/'>
            <span>MEME</span>
            <img
              alt="logo"
              src={logo}
              height="30px"
              width="35px"
            />
            <span>together</span>
          </StyledLogoLink>
          <StyledIconButton
            type="button"
            onClick={mobileNav.onToggle}
          >
            <StyledSpan>&#9776;</StyledSpan>
          </StyledIconButton>
          {mobileNav.isOpen && (
            <StyledMobileUl>
              <li>
                <StyledMobileLink to="/explorememes" onClick={mobileNav.onClose}>
                  探索
                </StyledMobileLink>
              </li>
              <li>
                <StyledMobileLink to="/templates" onClick={mobileNav.onClose}>
                  創作
                </StyledMobileLink>
              </li>
              {userData && (
                <li>
                  <StyledMobileLink to="/uploadtemplate" onClick={mobileNav.onClose}>
                    貢獻模板
                  </StyledMobileLink>
                </li>
              )}
              {userData ? (
                <>
                  <li>
                    <StyledMobileButton type="button" onClick={handleAccountClick}>
                      <img
                        alt="account"
                        src={account}
                        width="30px"
                        height="30px"
                      />
                    </StyledMobileButton>
                  </li>
                  <li>
                    <StyledMobileButton type="button" onClick={handleSettingClick}>
                      <img
                        alt="setting"
                        src={setting}
                        width="30px"
                        height="30px"
                      />
                    </StyledMobileButton>
                  </li>
                  <li>
                    <StyledMobileButton type="button" onClick={handleLogoutClick}>
                      登出
                    </StyledMobileButton>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <StyledMobileButton type="button" onClick={loginDialog.onOpen}>
                      登入
                    </StyledMobileButton>
                  </li>
                  <li>
                    <StyledMobileButton type="button" onClick={signupDialog.onOpen}>
                      註冊
                    </StyledMobileButton>
                  </li>
                </>
              )}
            </StyledMobileUl>
          )}
        </StyledMobileNav>
      </StyledHeader>
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
};

export default AppHeader;
