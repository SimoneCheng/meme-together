import firebase from "firebase/app";
import { auth } from "@/libs/firebase";

export const reAuth = (password) => {
  const user = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user
    .reauthenticateWithCredential(credential)
    .then(() => user)
    .catch(() => false);
};
