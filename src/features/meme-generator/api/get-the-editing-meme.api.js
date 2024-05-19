import { db } from '@/libs/firebase';

export const getTheEditingMeme = ({ userId, docId }) => {
  return db
    .collection('users')
    .doc(userId)
    .collection('editing_meme')
    .doc(docId)
    .get()
    .then((snapShot) => snapShot.data())
};
