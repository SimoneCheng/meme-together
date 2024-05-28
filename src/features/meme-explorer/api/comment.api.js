import { db } from "@/libs/firebase";

export const getAllComments = ({ memeId, callback }) => {
  return db
    .collection('completed_meme')
    .doc(memeId)
    .collection('comments')
    .orderBy('created_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const allComments = [];
      querySnapshot.forEach(doc => {
        allComments.push({ data: doc.data(), docId: doc.id });
      });
      callback(allComments);
    });
};

export const addComment = ({ memeId, data }) => {
  return db
    .collection('completed_meme')
    .doc(memeId)
    .collection('comments')
    .add(data);
};

export const deleteComment = ({ memeId, commentId }) => {
  return db
    .collection('completed_meme')
    .doc(memeId)
    .collection('comments')
    .doc(commentId)
    .delete();
};

export const updateComment = ({
  memeId,
  commentId,
  data
}) => {
  return db
  .collection('completed_meme')
  .doc(memeId)
  .collection('comments')
  .doc(commentId)
  .update(data);
};
