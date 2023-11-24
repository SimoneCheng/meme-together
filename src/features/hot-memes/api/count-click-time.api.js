import { db } from "@/libs/firebase";

const getClickTime = (docId) => {
  return db
    .collection('completed_meme')
    .doc(docId)
    .get()
    .then((snapShot) => snapShot.data().click_time);
};

const updateClickTime = (docId, data) => {
  return db
    .collection('completed_meme')
    .doc(docId)
    .update(data);
};

export const countClickTime = async (docId) => {
  const clickTime = await getClickTime(docId);
  updateClickTime(docId, { click_time: clickTime + 1 });
};
