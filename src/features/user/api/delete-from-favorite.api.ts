import { db } from "@/libs/firebase";

export const deletFromFavorite = ({ id, docId }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .doc(docId)
    .delete();
};
