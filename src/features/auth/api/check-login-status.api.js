import { auth } from "@/libs/firebase";

export const checkLoginStatus = () => {
  return auth
    .onAuthStateChanged((user) => {
      if (!user) return null;
      return {
        user_id: user.uid,
        user_name: user.displayName
      };
    });
};
