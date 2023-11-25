import { auth } from "@/libs/firebase";

export const nativeLogin = ({ email, password }) => {
  return auth.signInWithEmailAndPassword(email, password);
};
