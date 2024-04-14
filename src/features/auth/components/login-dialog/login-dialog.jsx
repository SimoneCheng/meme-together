import { useState } from 'react';
// api
import { nativeLogin } from '../../api';
// components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogFooterCloseButton
} from '@/components/dialog';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
// styles
import {
  StyledFormControl,
  StyledFormLabel
} from './login-dialog.style';
// utils
import { alertSuccess, alertError } from '@/utlis/alert';

const LoginDialog = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    email: '456@456.com',
    password: '123456'
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUserData({
      ...userData,
      [inputName]: inputValue
    });
  };

  const handleLoginClick = () => {
    const { email, password } = userData
    nativeLogin({ email, password })
      .then(() => {
        onClose();
        return alertSuccess('登入成功');
      })
      .catch((error) => {
        return alertError('登入失敗', error.message);
      });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
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
                name="email"
                value={userData.email}
                onChange={handleChange}
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
                name="password"
                value={userData.password}
                onChange={handleChange}
                autoComplete="on"
              />
            </StyledFormControl>
          </form>
        </DialogBody>
        <DialogFooter>
          <DialogFooterCloseButton>
            取消
          </DialogFooterCloseButton>
          <Button
            colorScheme="yellow"
            onClick={handleLoginClick}
          >
            登入
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
