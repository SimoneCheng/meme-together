import { useState } from "react";
import { Input } from "@/components/input";
import { changePassword } from "../../api";
import { alertError } from "@/utlis/alert";
import { StyledWrapper, StyledH1, StyledButton } from "./password-changing.style";

const PasswordChanging = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const handlePasswordChange = () => {
    if (oldPassword === '') {
      alertError(undefined, '尚未輸入舊密碼！');
      return;
    } else if (newPassword1 === '' || newPassword2 === '') {
      alertError(undefined, '尚未輸入新密碼！');
      return;
    } else if (newPassword2 !== newPassword1) {
      alertError(undefined, '［請再輸入一次新密碼］欄位有誤！');
      return;
    } else {
      changePassword({
        password: oldPassword,
        newPassword: newPassword1
      });
    }
  };

  return (
    <StyledWrapper>
      <StyledH1>修改密碼</StyledH1>
      <form>
        <p>請輸入舊密碼：</p>
        <Input
          variant="outline"
          type="password"
          autoComplete="on"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <p>請輸入新密碼：</p>
        <Input
          variant="outline"
          type="password"
          autoComplete="on"
          value={newPassword1}
          onChange={(e) => setNewPassword1(e.target.value)}
        />
        <p>請再輸入一次新密碼：</p>
        <Input
          variant="outline"
          type="password"
          autoComplete="on"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
        />
        <StyledButton
          colorScheme="yellow"
          variant="solid"
          onClick={handlePasswordChange}
        >
            送出
        </StyledButton>
      </form>
    </StyledWrapper>
  )
};

export default PasswordChanging;
