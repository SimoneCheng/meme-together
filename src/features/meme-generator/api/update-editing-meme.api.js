import { db } from "@/libs/firebase";

export const updateEditingMeme = ({
  id,
  docId,
  data
}) => {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .doc(docId)
    .update(data);
};
