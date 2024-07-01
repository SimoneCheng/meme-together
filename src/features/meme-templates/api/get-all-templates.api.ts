import { db } from "@/libs/firebase";

export const getAllTemplates = () => {
  return db
    .collection('templates')
    .orderBy('created_time', 'desc')
    .limit(15)
    .get()
    .then((querySnapshot) => {
      const docs = querySnapshot.docs;
      const lastKey = docs[docs.length - 1];
      const allTemplatesData = docs.map((doc) => doc.data());
      return {
        allTemplatesData,
        lastKey
      };
    });
};

export const getAllTemplatesNextPage = (lastKey) => {
  return db
    .collection('templates')
    .orderBy('created_time', 'desc')
    .startAfter(lastKey)
    .limit(15)
    .get()
    .then((querySnapshot) => {
      const docs = querySnapshot.docs;
      const lastKey = docs[docs.length - 1];
      const allTemplatesData = docs.map((doc) => doc.data());
      return {
        allTemplatesData,
        lastKey
      };
    });
};
