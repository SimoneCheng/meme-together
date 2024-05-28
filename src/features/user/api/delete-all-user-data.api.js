import { db, storageRef } from "@/libs/firebase";

export const deleteAllUserData = (id) => {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
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
        .collection('users')
        .doc(id)
        .collection('following_list')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      db
        .collection('users')
        .doc(id)
        .collection('follower_list')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      db
        .collection('users')
        .doc(id)
        .collection('favorites')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      db
        .collection('users')
        .doc(id)
        .delete();
    })
    .then(() => {
      db
        .collectionGroup('following_list')
        .where('user_id', '==', id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      db
        .collectionGroup('follower_list')
        .where('user_id', '==', id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      db
        .collectionGroup('favorites')
        .where('owner_user_id', '==', id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      db
        .collection('completed_meme')
        .where('owner_user_id', '==', id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.collection("comments").get().then((querySnapshot) => {
              if (querySnapshot.docs.length > 0) {
                querySnapshot.docs.forEach(snapshot => {
                  snapshot.ref.delete();
                });
              }
            });
          });
        });
    })
    .then(() => {
      db
        .collection('completed_meme')
        .where('owner_user_id', '==', id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach(doc => {
              storageRef.child(`completed_meme/${doc.data().img_name}`).delete();
            });
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      db
        .collectionGroup('comments')
        .where('user_id', '==', id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            });
          }
        });
    })
    .then(() => {
      if (storageRef.child(`users/${id}`)) {
        storageRef.child(`users/${id}`).delete();
      }
    });
};
