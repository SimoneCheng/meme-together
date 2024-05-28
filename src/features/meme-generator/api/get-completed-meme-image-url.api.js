import { storageRef } from "@/libs/firebase";

export const getCompletedMemeImageUrl = (fileName) => {
  return storageRef
    .child(`completed_meme/${fileName}`)
    .getDownloadURL();
};
