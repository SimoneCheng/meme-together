import { useHistory } from "react-router-dom";
import {
  nativeLogout,
  useIsAuthenticated
} from "@/features/auth";
// components
import { LoginDialog, SignupDialog } from "@/features/auth";
// hooks
import { useDisclosure } from "@/hooks";
// utils
import { alertError, alertSuccess } from "@/utlis/alert";
// image
import logo from '@/image/outline_bug_report_black_36dp.png';
import account from '@/image/outline_account_circle_black_36dp.png';
import setting from '@/image/outline_settings_black_36dp.png';
// styles
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
  const history = useHistory();
  const [isAuthenticated] = useIsAuthenticated();
  const mobileNav = useDisclosure();
  const loginDialog = useDisclosure();
  const signupDialog = useDisclosure();

  const handleAccountClick = () => {
    if (!isAuthenticated) return alertError(undefined, '尚未登入');
    if (mobileNav.isOpen) mobileNav.onClose();
    history.push('/personal');
  };

  const handleSettingClick = () => {
    if (!isAuthenticated) return alertError(undefined, "尚未登入！");
    if (mobileNav.isOpen) mobileNav.onClose();
    history.push('/settings');
  };

  const handleLogoutClick = () => {
    nativeLogout().then(() => {
      alertSuccess('登出成功！跳轉至首頁！');
      if (mobileNav.isOpen) mobileNav.onClose();
      history.push('/');
    });
  };

  return (
    <>
      <StyledHeader>
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
              <StyledButtonLink to="/explore-memes">
                探索
              </StyledButtonLink>
            </li>
            <li>
              <StyledButtonLink to="/templates">
                創作
              </StyledButtonLink>
            </li>
            {isAuthenticated && (
              <li>
                <StyledButtonLink to="/template-uploading">
                  貢獻模板
                </StyledButtonLink>
              </li>
            )}
          </StyledDesktopUl>
          {isAuthenticated ? (
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
                >
                  登入
                </StyledButtonLink>
              </li>
              <li>
                <StyledButtonLink
                  as="button"
                  type="button"
                  onClick={signupDialog.onOpen}
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
                <StyledMobileLink to="/explore-memes" onClick={mobileNav.onClose}>
                  探索
                </StyledMobileLink>
              </li>
              <li>
                <StyledMobileLink to="/templates" onClick={mobileNav.onClose}>
                  創作
                </StyledMobileLink>
              </li>
              {isAuthenticated && (
                <li>
                  <StyledMobileLink to="/template-uploading" onClick={mobileNav.onClose}>
                    貢獻模板
                  </StyledMobileLink>
                </li>
              )}
              {isAuthenticated ? (
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
