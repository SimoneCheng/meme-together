import { auth } from "@/libs/firebase";

export const nativeLogin = ({ email, password }: {
  email: string;
  password: string;
}) => {
  return auth.signInWithEmailAndPassword(email, password);
};
