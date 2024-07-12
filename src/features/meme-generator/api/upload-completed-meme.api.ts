import { storageRef } from "@/libs/firebase";

export const uploadCompletedMeme = ({ id, file }) => {
  return storageRef
    .child(`completed_meme/${id}-${new Date().getTime()}`)
    .putString(file, 'data_url')
    .then((snapShot) => {
      return snapShot.ref.name;
    });
};
