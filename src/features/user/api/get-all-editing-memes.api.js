import { db } from "@/libs/firebase";

export const getAllEditingMemes = ({ id, callback }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .orderBy('last_save_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const allEditingMemeData = [];
      querySnapshot.forEach(doc => {
        allEditingMemeData.push({ data: doc.data(), docId: doc.id });
      });
      callback(allEditingMemeData);
    })
};
