import { db } from "@/libs/firebase";

export const saveCompletedMeme = ({ id, data }) => {
  return db
    .collection('completed_meme')
    .doc(id)
    .set(data);
};
