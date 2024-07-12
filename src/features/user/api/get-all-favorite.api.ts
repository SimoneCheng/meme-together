import { db } from "@/libs/firebase";

export const getAllFavorite = ({ id, callback }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .orderBy('created_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const allFavorite = [];
      querySnapshot.forEach(doc => {
        allFavorite.push(doc.data());
      });
      callback(allFavorite);
    });
};
