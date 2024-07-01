import { db, storageRef } from "@/libs/firebase";

export const getUserInfo = ({ id, callback }) => {
  return db
    .collection('users')
    .doc(id)
    .onSnapshot((snapShot) => {
      callback(snapShot.data());
    });
};

export const updateUserInfo = ({ id, data }) => {
  return db
    .collection('users')
    .doc(id)
    .update(data);
};

export const getProfileImg = (id) => {
  return storageRef
    .child(`users/${id}`)
    .getDownloadURL();
};

export const uploadProfileImg = ({ id, file }) => {
  return storageRef
    .child(`users/${id}`)
    .put(file);
};
