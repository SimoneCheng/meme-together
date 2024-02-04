import { db } from "@/libs/firebase";

export const addFollower = (id2, id, data) => {
  return db
    .collection('users')
    .doc(id2)
    .collection('follower_list')
    .doc(id)
    .set(data);
};

export const  deleteFollower = (id2, id) => {
  return db.collection('users')
    .doc(id2)
    .collection('follower_list')
    .doc(id)
    .delete();
};

export const checkAllFollowers = (id, callback) => {
  return db
    .collection('users')
    .doc(id)
    .collection('follower_list')
    .onSnapshot((querySnapshot) => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push(doc.id);
      })
      callback(result);
    })
};
