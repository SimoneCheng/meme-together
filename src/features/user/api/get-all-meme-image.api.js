import { db } from "@/libs/firebase";

export const getAllEditingMemes = ({ id, callback }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .orderBy('last_save_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const allEditingMemeData = [];
      querySnapshot.forEach(doc => {
        allEditingMemeData.push({ data: doc.data(), docId: doc.id });
      });
      callback(allEditingMemeData);
    })
};

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
