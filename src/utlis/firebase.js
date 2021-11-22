import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { alertSuccess, alertError } from './alert';
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storageRef = firebase.storage().ref();

// Header: Login & Signup & Signout & CheckLoginStatus
function nativeSignup(email, password, name) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser;
      user.updateProfile({
        displayName: name,
        photoURL: process.env.REACT_APP_defaultProfileImg
      })
      db.collection('users').doc(user.uid).set({
        user_id: user.uid,
        user_email: user.email,
        user_name: name,
        user_img: process.env.REACT_APP_defaultProfileImg,
        created_time: user.metadata.creationTime,
        self_intro: "還沒有個人簡介喔！"
      });
    })
    .then(() => {
      alertSuccess('註冊成功');
      return true;
    })
    .catch((error) => {
      alertError('註冊失敗！', error.message);
      return false;
    });
}

function nativeLogin(email, password) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      alertSuccess('登入成功');
    })
    .catch(error => {
      alertError('登入失敗！', error.message);
    });
}

function nativeLogout() {
  return auth
    .signOut()
    .catch((error) => {
      alertError(undefined, error.message);
    });
}

function checkLoginStatus(dispatch, setUserData) {
  return auth
    .onAuthStateChanged((user) => {
      if (user) {
        const userData = { user_id: user.uid, user_name: user.displayName };
        dispatch(setUserData(userData));
      } else {
        dispatch(setUserData(null));
      };
    });
}

// User Setting
function reAuth(password) {
  const user = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
  return user
    .reauthenticateWithCredential(credential)
    .then(() => user);
}

function updatePassword(password, newPassword) {
  return reAuth(password)
    .then((res) => {
      res.updatePassword(newPassword)
        .then(() => alertSuccess('密碼更新完成，請重新登入！'))
        .then(() => nativeLogout())
        .catch((error) => alertError('修改密碼失敗！', error.message));
    })
    .catch(() => alertError('舊密碼輸入錯誤', undefined));
}

function deleteAccount(password) {
  return reAuth(password)
    .then((res) => {
      res.delete();
    })
    .then(() => alertSuccess('成功刪除帳號！'));
}

function uploadProfileImg(id, file) {
  return storageRef
    .child(`users/${id}`)
    .put(file);
}

function getProfileImg(id) {
  return storageRef.child(`users/${id}`).getDownloadURL();
}

function updateUserInfo(id, data) {
  return db
    .collection('users')
    .doc(id)
    .update(data)
}

// All Tamplates Page
function getAllTemplates(setAllTemplates) {
  return db
    .collection('templates')
    .onSnapshot((querySnapshot) => {
      const templatesData = [];
      querySnapshot.forEach(doc => {
        templatesData.push(doc.data());
      })
      setAllTemplates(templatesData);
    })
}

// Meme Generator Page: Template
function getTheTemplate(docId) {
  return db
    .collection('templates')
    .doc(docId)
    .get()
    .then((snapShot) => snapShot.data());
}

// Functions for User
function getUserInfo(id, setUserInfo) {
  return db
    .collection('users')
    .doc(id)
    .onSnapshot((snapShot) => {
      setUserInfo(snapShot.data());
    });
}

function saveEditingMeme(id, data) {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .add(data);
}

function updateEditingMeme(id, docId, data) {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .doc(docId)
    .update(data);
}

function deleteEditingMeme(id, docId) {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .doc(docId)
    .delete();
}

function getAllEditingMeme(id, setAllEditingMeme) {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .orderBy('last_save_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const allEditingMemeData = [];
      querySnapshot.forEach(doc => {
        allEditingMemeData.push({ data: doc.data(), docId: doc.id });
      })
      setAllEditingMeme(allEditingMemeData);
    })
}

function getTheEditingMeme(id, docId) {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .doc(docId)
    .get()
    .then((snapShot) => snapShot.data())
}

function uploadCompletedMeme(id, file) {
  return storageRef
    .child(`completed_meme/${id}-${new Date().getTime()}`)
    .putString(file, 'data_url')
    .then((snapShot) => {
      return snapShot.ref.name;
    })
}

function getCompletedMemeImageUrl(fileName) {
  return storageRef.child(`completed_meme/${fileName}`).getDownloadURL();
}

function saveCompletedMeme(id, data) {
  return db
    .collection('completed_meme')
    .doc(id)
    .set(data);
}

function getPrivateMemeImg(id, setPrivateMemeImg) {
  return db
    .collection('completed_meme')
    .where("owner_user_id", "==", id)
    .where("isPublic", "==", false)
    .orderBy('last_save_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const privateMemeImgData = [];
      querySnapshot.forEach(doc => {
        privateMemeImgData.push(doc.data());
      })
      setPrivateMemeImg(privateMemeImgData);
    });
}

function getPublicMemeImg(id, setPublicMemeImg) {
  return db
    .collection('completed_meme')
    .where("owner_user_id", "==", id)
    .where("isPublic", "==", true)
    .orderBy('last_save_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const publicMemeImgData = [];
      querySnapshot.forEach(doc => {
        publicMemeImgData.push(doc.data());
      })
      setPublicMemeImg(publicMemeImgData);
    });
}

function deleteMemeImgInDb(docId) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .collection('comments')
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
        .collection('completed_meme')
        .doc(docId)
        .delete();
    })
}

function deleteMemeImgInStorage(fileName) {
  return storageRef.child(`completed_meme/${fileName}`).delete();
}

function changeMemePublicStatus(docId, data) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .update(data);
}

function getTheMemeImage(docId, setTheMemeImg) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .get()
    .then((snapShot) => {
      setTheMemeImg(snapShot.data());
    })
}

function getAllPublicMemeImg(sort) {
  return db
    .collection('completed_meme')
    .where('isPublic', '==', true)
    .orderBy('last_save_time', sort)
    .limit(15)
    .get()
    .then((querySnapshot) => {
      let lastKey;
      const allPublicMemeImgData = [];
      querySnapshot.forEach(doc => {
        allPublicMemeImgData.push(doc.data());
        lastKey = doc;
      })
      return { allPublicMemeImgData, lastKey }
    });
}

function getAllPublicMemeNextPage(lastOne, sort = 'desc') {
  return db
    .collection('completed_meme')
    .where('isPublic', '==', true)
    .orderBy('last_save_time', sort)
    .startAfter(lastOne)
    .limit(15)
    .get()
    .then((querySnapshot) => {
      let lastKey;
      const allPublicMemeImgData = [];
      querySnapshot.forEach(doc => {
        allPublicMemeImgData.push(doc.data());
        lastKey = doc;
      })
      return { allPublicMemeImgData, lastKey }
    })
}

function getAllComments(docId, setAllComments) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .collection('comments')
    .orderBy('created_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const allComments = [];
      querySnapshot.forEach(doc => {
        allComments.push({ data: doc.data(), docId: doc.id });
      })
      setAllComments(allComments);
    });
}

function addComment(docId, data) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .collection('comments')
    .add(data);
}

function deleteComment(docId, commentId) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .collection('comments')
    .doc(commentId)
    .delete();
}

function updateComment(docId, commentId, data) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .collection('comments')
    .doc(commentId)
    .update(data);
}

function addToFavorite(id, docId, data) {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .doc(docId)
    .set(data);
}

function deletFromFavorite(id, docId) {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .doc(docId)
    .delete();
}

function getAllFavorite(id, setAllFavorite) {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .orderBy('created_time', 'desc')
    .onSnapshot((querySnapshot) => {
      const allFavorite = [];
      querySnapshot.forEach(doc => {
        allFavorite.push(doc.data());
      })
      setAllFavorite(allFavorite);
    });
}

function checkFavoriteList(id, img_name, setResult) {
  return db
    .collection('users')
    .doc(id)
    .collection('favorites')
    .where('img_name', '==', img_name)
    .onSnapshot((querySnapshot) => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push(doc.data());
      })
      setResult(result);
    });
}

function getClickTime(docId) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .get()
    .then((snapShot) => snapShot.data().click_time);
}

function updateClickTime(docId, data) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .update(data);
}

function getCampaignMeme() {
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

function addFollowing(id, id2, data) {
  return db
    .collection('users')
    .doc(id)
    .collection('following_list')
    .doc(id2)
    .set(data);
}

function addFollower(id2, id, data) {
  return db
    .collection('users')
    .doc(id2)
    .collection('follower_list')
    .doc(id)
    .set(data);
}

function unfollowing(id, id2) {
  return db
    .collection('users')
    .doc(id)
    .collection('following_list')
    .doc(id2)
    .delete();
}

function deleteFollower(id2, id) {
  return db.collection('users')
    .doc(id2)
    .collection('follower_list')
    .doc(id)
    .delete();
}

function checkAllFollowing(id, setResult) {
  return db
    .collection('users')
    .doc(id)
    .collection('following_list')
    .onSnapshot((querySnapshot) => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push(doc.id);
      })
      setResult(result);
    });
}

function checkAllFollowers(id, setResult) {
  return db
    .collection('users')
    .doc(id)
    .collection('follower_list')
    .onSnapshot((querySnapshot) => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push(doc.id);
      })
      setResult(result);
    })
}

function getAllFollowing(followingList) {
  return db
    .collection('users')
    .where('user_id', 'in', followingList)
    .get()
    .then((querySnapshot) => {
      const allFollowing = [];
      querySnapshot.forEach(doc => {
        allFollowing.push(doc.data());
      })
      return allFollowing;
    })
}

function getAllFollowers(followersList) {
  return db
    .collection('users')
    .where('user_id', 'in', followersList)
    .get()
    .then((querySnapshot) => {
      const allFollowers = [];
      querySnapshot.forEach(doc => {
        allFollowers.push(doc.data());
      })
      return allFollowers;
    })
}

function uploadTemplate(id, file) {
  return storageRef
    .child(`templates/${id}-${new Date().getTime()}`)
    .put(file)
    .then((snapShot) => {
      return snapShot.ref.name;
    })
}

function getTemplateURL(fileName) {
  return storageRef.child(`templates/${fileName}`).getDownloadURL();
}

function saveNewTemplate(id, data) {
  return db
    .collection('templates')
    .doc(id)
    .set(data);
}

function searchPublicMeme(keyword) {
  return db
    .collection('completed_meme')
    .where('isPublic', '==', true)
    .where('search_array_term', 'array-contains', keyword)
    .get()
    .then((querySnapshot) => {
      const result = [];
      querySnapshot.forEach(doc => {
        result.push(doc.data());
      })
      return result;
    });
}

function deleteAllData(id) {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .get()
    .then(querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach(snapshot => {
          snapshot.ref.delete();
        })
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
            })
          }
        })
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
            })
          }
        })
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
            })
          }
        })
    })
    .then(() => {
      db
        .collection('users')
        .doc(id)
        .delete()
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
            })
          }
        })
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
            })
          }
        })
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
            })
          }
        })
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
                })
              }
            });
          });
        })
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
            })
            querySnapshot.docs.forEach(snapshot => {
              snapshot.ref.delete();
            })
          }
        })
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
            })
          }
        })
    })
  // .then(() => storageRef.child(`users/${id}`).delete())
}

export {
  nativeSignup,
  nativeLogin,
  nativeLogout,
  checkLoginStatus,
  getAllTemplates,
  getTheTemplate,
  saveEditingMeme,
  updateEditingMeme,
  deleteEditingMeme,
  getAllEditingMeme,
  getTheEditingMeme,
  getUserInfo,
  uploadCompletedMeme,
  getCompletedMemeImageUrl,
  saveCompletedMeme,
  getPrivateMemeImg,
  getPublicMemeImg,
  deleteMemeImgInDb,
  deleteMemeImgInStorage,
  changeMemePublicStatus,
  getTheMemeImage,
  getAllPublicMemeImg,
  getAllPublicMemeNextPage,
  getAllComments,
  addComment,
  deleteComment,
  updateComment,
  addToFavorite,
  deletFromFavorite,
  getAllFavorite,
  checkFavoriteList,
  getClickTime,
  updateClickTime,
  getCampaignMeme,
  addFollowing,
  addFollower,
  unfollowing,
  deleteFollower,
  checkAllFollowing,
  checkAllFollowers,
  getAllFollowing,
  getAllFollowers,
  updateUserInfo,
  reAuth,
  updatePassword,
  uploadProfileImg,
  getProfileImg,
  uploadTemplate,
  getTemplateURL,
  saveNewTemplate,
  searchPublicMeme,
  deleteAllData,
  deleteAccount
};