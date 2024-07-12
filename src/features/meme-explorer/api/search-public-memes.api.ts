import { db } from "@/libs/firebase";

export const searchPublicMemes = (keyword) => {
  return db
  .collection('completed_meme')
  .where('isPublic', '==', true)
  .where('search_array_term', 'array-contains', keyword)
  .get()
  .then((querySnapshot) => {
    return querySnapshot.docs.map(doc => doc.data());
  });
};
