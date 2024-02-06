import { db } from "@/libs/firebase";

export const addFollowing = (id, id2, data) => {
  return db
    .collection('users')
    .doc(id)
    .collection('following_list')
    .doc(id2)
    .set(data);
};

export const unfollowing = (id, id2) => {
  return db
    .collection('users')
    .doc(id)
    .collection('following_list')
    .doc(id2)
    .delete();
};

export const checkAllFollowing = ({ id, callback }) => {
  return db
    .collection('users')
    .doc(id)
    .collection('following_list')
    .onSnapshot((querySnapshot) => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push(doc.id);
      })
      callback(result);
    });
}
