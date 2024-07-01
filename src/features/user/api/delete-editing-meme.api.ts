import { db } from "@/libs/firebase";

export const deletEditingMeme = ({ id, docId }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .doc(docId)
    .delete();
};
