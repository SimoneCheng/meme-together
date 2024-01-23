import { db } from "@/libs/firebase";

export const changeMemePublicStatus = ({ docId, isPublic }) => {
  return db
    .collection('completed_meme')
    .doc(docId)
    .update({
      isPublic,
      last_save_time: new Date()
    });
};
