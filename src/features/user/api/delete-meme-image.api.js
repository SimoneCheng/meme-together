import { db, storageRef } from "@/libs/firebase";

export const deleteMemeImageInDb = (docId) => {
  return db
    .collection('completed_meme')
    .doc(docId)
    .collection('comments')
    .get()
    .then(querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach(snapshot => {
          snapshot.ref.delete();
        });
      }
    })
    .then(() => {
      db
        .collection('completed_meme')
        .doc(docId)
        .delete();
    });
};

export const deleteMemeImageInStorage = (fileName) => {
  return storageRef.child(`completed_meme/${fileName}`).delete();
};
