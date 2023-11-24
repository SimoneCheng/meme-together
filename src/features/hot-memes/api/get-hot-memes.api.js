import { db } from "@/libs/firebase";

export const getHotMemes = () => {
  return db
    .collection('completed_meme')
    .where('isPublic', '==', true)
    .orderBy('click_time', 'desc')
    .limit(6)
    .get()
    .then((querySnapshot) => {
      const campaignMeme = [];
      querySnapshot.forEach(doc => {
        campaignMeme.push(doc.data());
      })
      return campaignMeme;
    });
}
