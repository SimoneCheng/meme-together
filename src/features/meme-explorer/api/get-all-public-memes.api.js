import { db } from "@/libs/firebase";

const defaultSort = 'desc';

export const getAllPublicMemes = (sort = defaultSort) => {
  return db
    .collection('completed_meme')
    .where('isPublic', '==', true)
    .orderBy('last_save_time', sort)
    .limit(15)
    .get()
    .then((querySnapshot) => {
      const docs = querySnapshot.docs;
      const lastKey = docs[docs.length - 1];
      const allPublicMemeImgData = docs.map((doc) => doc.data());
      return {
        allPublicMemeImgData,
        lastKey
      };
    });
};

export const getAllPublicMemesNextPage = (lastKey, sort = defaultSort) => {
  return db
    .collection('completed_meme')
    .where('isPublic', '==', true)
    .orderBy('last_save_time', sort)
    .startAfter(lastKey)
    .limit(15)
    .get()
    .then((querySnapshot) => {
      const docs = querySnapshot.docs;
      const lastKey = docs[docs.length - 1];
      const allPublicMemeImgData = docs.map((doc) => doc.data());
      return {
        allPublicMemeImgData,
        lastKey
      };
    });
};
