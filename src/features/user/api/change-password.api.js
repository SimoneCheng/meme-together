import { reAuth, nativeLogout } from "@/features/auth";
import { alertSuccess, alertError } from "@/utlis/alert";

export const changePassword = ({ password, newPassword }) => {
  return reAuth(password)
    .then((res) => {
      res.updatePassword(newPassword)
        .then(() => alertSuccess('密碼更新完成，請重新登入！'))
        .then(() => nativeLogout())
        .catch((error) => alertError('修改密碼失敗！', error.message));
    })
    .catch(() => alertError('舊密碼輸入錯誤', undefined));
}
