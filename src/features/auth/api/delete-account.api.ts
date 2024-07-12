import { reAuth } from "./re-auth.api";
import { alertSuccess } from "@/utlis/alert";

export const deleteAccount = (password: string) => {
  return reAuth(password)
    .then((res) => {
      res.delete();
    })
    .then(() => alertSuccess('成功刪除帳號！'))
    .catch(() => false);
};
