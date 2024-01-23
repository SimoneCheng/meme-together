import { db } from "@/libs/firebase";

export const getPublicMemeImage = ({ id, callback }) => {
  return db
    .collection('completed_meme')
    .where("owner_user_id", "==", id)
    .where("isPublic", "==", true)
    .orderBy('last_save_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const publicMemeImgData = [];
      querySnapshot.forEach(doc => {
        publicMemeImgData.push(doc.data());
      })
      callback(publicMemeImgData);
    });
};

export const getPrivateMemeImage = ({ id, callback }) => {
  return db
    .collection('completed_meme')
    .where("owner_user_id", "==", id)
    .where("isPublic", "==", false)
    .orderBy('last_save_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const privateMemeImgData = [];
      querySnapshot.forEach(doc => {
        privateMemeImgData.push(doc.data());
      })
      callback(privateMemeImgData);
    });
};

