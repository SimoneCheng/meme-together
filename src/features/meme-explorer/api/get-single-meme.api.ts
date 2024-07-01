import { db } from "@/libs/firebase";

export const getSingleMeme = ({ id, callback }) => {
  return db
    .collection('completed_meme')
    .doc(id)
    .get()
    .then((snapShot) => {
      callback(snapShot.data());
    });
};
