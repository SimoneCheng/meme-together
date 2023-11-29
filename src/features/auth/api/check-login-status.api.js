import { auth } from "@/libs/firebase";

export const checkLoginStatus = (callback) => {
  auth.onAuthStateChanged((user) => {
    const formattedUser = user ? {
      user_id: user.uid,
      user_name: user.displayName
    } : null;
    callback(formattedUser);
  });
};
