import React, { useState } from 'react';
// api
import { nativeLogin } from '../../api';
// components
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogFooterCloseButton
} from '@/components/dialog';
import color from '@/components/Styled/colorTheme';
// styles
import { StyledInput, StyledButton } from './login-dialog.style';
// utils
import { alertSuccess, alertError } from '@/utlis/alert';

const LoginDialog = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('456@456.com');
  const [password, setPassword] = useState('123456');

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.targe.value;
    setPassword(value);
  };

  const handleLoginClick = () => {
    nativeLogin({ email, password })
      .then(() => {
        onClose();
        return alertSuccess('登入成功');
      })
      .catch((error) => {
        onClose();
        return alertError('登入失敗', error.message);
      });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogOverlay>
        <DialogContent>
          <DialogHeader>登入</DialogHeader>
          <DialogBody>
            <form>
              <div>
                <div>電子信箱</div>
                <StyledInput
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="on"
                />
              </div>
              <div>
                <div>密碼</div>
                <StyledInput
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="on"
                />
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogFooterCloseButton>
              取消
            </DialogFooterCloseButton>
            <StyledButton
              color={color}
              onClick={handleLoginClick}
            >
              登入
            </StyledButton>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}

export default LoginDialog;
