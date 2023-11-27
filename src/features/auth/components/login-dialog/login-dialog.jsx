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
import { Input } from '@/components/input';
import color from '@/components/Styled/colorTheme';
// styles
import {
  StyledButton,
  StyledFormControl,
  StyledFormLabel
} from './login-dialog.style';
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
          <DialogHeader>
            登入
          </DialogHeader>
          <DialogBody>
            <form>
              <StyledFormControl>
                <StyledFormLabel>
                  電子信箱
                </StyledFormLabel>
                <Input
                  variant="outline"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="on"
                />
              </StyledFormControl>
              <StyledFormControl>
                <StyledFormLabel>
                  密碼
                </StyledFormLabel>
                <Input
                  variant="outline"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="on"
                />
              </StyledFormControl>
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
