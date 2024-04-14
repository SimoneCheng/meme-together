import { useState } from 'react';
// apis
import { nativeSignup } from '../../api';
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
  StyledFormLabel,
} from './signup-dialog.style';
// utils
import { alertError, alertSuccess } from '@/utlis/alert';

const SignupDialog = ({ isOpen, onClose }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setUserData({
      ...userData,
      [inputName]: inputValue
    });
  };

  const handleSignupClick = () => {
    if (!userData.name) return alertError(undefined, '請輸入暱稱！');
    const { email, password, name } = userData;
    nativeSignup({ email, password, name })
      .then(() => {
        onClose();
        return alertSuccess('註冊成功');
      })
      .catch((error) => {
        return alertError('註冊失敗', error.message);
      });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          註冊
        </DialogHeader>
        <DialogBody>
          <form>
            <StyledFormControl>
              <StyledFormLabel>
                暱稱
              </StyledFormLabel>
              <Input
                variant="outline"
                type="text"
                placeholder="name"
                name="name"
                autoComplete="on"
                value={userData.name}
                onChange={handleChange}
              />
            </StyledFormControl>
            <StyledFormControl>
              <StyledFormLabel>
                電子信箱
              </StyledFormLabel>
              <Input
                variant="outline"
                type="email"
                placeholder="email"
                name="email"
                autoComplete="on"
                value={userData.email}
                onChange={handleChange}
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
                autoComplete="on"
                value={userData.password}
                onChange={handleChange}
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
            onClick={handleSignupClick}
          >
            註冊
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog
