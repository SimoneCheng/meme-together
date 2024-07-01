import { auth } from "@/libs/firebase";

export const nativeLogout = () => {
  return auth.signOut();
};
