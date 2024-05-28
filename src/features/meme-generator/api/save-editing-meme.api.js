import { db } from "@/libs/firebase";

export const saveEditingMeme = ({ id, data }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .add(data);
};
