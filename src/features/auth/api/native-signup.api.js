import { auth, db } from "@/libs/firebase";

export const nativeSignup = ({ email, password, name }) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      user.updateProfile({
        displayName: name,
        photoURL: process.env.REACT_APP_defaultProfileImg
      })
      db.collection('users').doc(user.uid).set({
        user_id: user.uid,
        user_email: user.email,
        user_name: name,
        user_img: process.env.REACT_APP_defaultProfileImg,
        created_time: user.metadata.creationTime,
        self_intro: "還沒有個人簡介喔！"
      });
    })
    .catch((error) => {
      throw Error(error.message);
    });
};
