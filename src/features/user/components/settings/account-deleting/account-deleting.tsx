import { useState } from "react";
import { reAuth, deleteAccount, useAuthId } from "@/features/auth";
import { deleteAllUserData } from "../../../api";
import { Input } from "@/components/input";
import { alertError, alertDelete } from "@/utlis/alert";
import { StyledWrapper, StyledH1, StyledButton } from "./account-deleting.style";

const AccountDeleting = () => {
  const [authId] = useAuthId();
  const [password, setPassword] = useState('');

  const handleDelete = () => {
    reAuth(password)
      .then((res) => {
        if (!res) {
          alertError(undefined, '密碼輸入錯誤！請重新輸入！');
        }
        deleteAllUserData(authId)
          .then(() => {
            deleteAccount(password);
          });
      })
      .catch(() =>  false);
  };

  const handleConfirm = () => {
    alertDelete(handleDelete);
  };

  return (
    <StyledWrapper>
      <StyledH1>刪除帳戶</StyledH1>
      <form>
        <p>請輸入密碼：</p>
        <Input
          variant="outline"
          type="password"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <StyledButton
          colorScheme="yellow"
          variant="solid"
          onClick={handleConfirm}
        >
          刪除帳戶
        </StyledButton>
      </form>
    </StyledWrapper>
  );
};

export default AccountDeleting;
