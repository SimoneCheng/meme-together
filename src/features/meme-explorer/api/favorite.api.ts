import { db } from "@/libs/firebase";

export const addToFavorite = ({ id, docId, data }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .doc(docId)
    .set(data);
};

export const deleteFromFavorite = ({ id, docId }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .doc(docId)
    .delete();
};

export const checkFavoriteList = ({ id, imgName, callback }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .where('img_name', '==', imgName)
    .onSnapshot((querySnapshot) => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push(doc.data());
      });
      callback(result);
    });
};
