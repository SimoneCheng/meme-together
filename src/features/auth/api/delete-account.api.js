import { reAuth } from "./re-auth.api";
import { alertSuccess } from "@/utlis/alert";

export const deleteAccount = (password) => {
  return reAuth(password)
    .then((res) => {
      res.delete();
    })
    .then(() => alertSuccess('成功刪除帳號！'));
}
