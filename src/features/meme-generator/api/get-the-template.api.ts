import { db } from '@/libs/firebase';

export const  getTheTemplate = (docId) => {
  return db
    .collection('templates')
    .doc(docId)
    .get()
    .then((snapShot) => snapShot.data());
};
