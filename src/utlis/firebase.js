import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
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
async function nativeSignup(email, password, name) {
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
        created_time: user.metadata.creationTime
      });
      alert("註冊成功！");
    })
    .catch((error) => {
      alert(error.message);
    });
}

async function nativeLogin(email, password) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      alert('登入成功！');
    })
    .catch(error => {
      alert(error.message);
    });
}

async function nativeLogout() {
  return auth
    .signOut()
    .catch((error) => {
      alert(error.message);
    });
}

function checkLoginStatus(dispatch, setUserData) {
  return auth
    .onAuthStateChanged((user) => {
      if (user) {
        const userData = { user_id: user.uid };
        dispatch(setUserData(userData));
      } else {
        dispatch(setUserData(null));
      };
    });
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

// Functions for Member
function getUserInfo(id, dispatch, setUserInfo) {
  return db
    .collection('users')
    .doc(id)
    .onSnapshot((snapShot) => {
      dispatch(setUserInfo(snapShot.data()));
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
    .onSnapshot((querySnapshot) => {
      const privateMemeImgData = [];
      querySnapshot.forEach(doc => {
        privateMemeImgData.push(doc.data());
      })
      setPrivateMemeImg(privateMemeImgData);
    });
}

function getPublicMemeImg(id, setPrivateMemeImg) {
  return db
    .collection('completed_meme')
    .where("owner_user_id", "==", id)
    .where("isPublic", "==", true)
    .onSnapshot((querySnapshot) => {
      const publicMemeImgData = [];
      querySnapshot.forEach(doc => {
        publicMemeImgData.push(doc.data());
      })
      setPrivateMemeImg(publicMemeImgData);
    });
}

function deleteMemeImgInDb(docId) {
  return db
    .collection('completed_meme')
    .doc(docId)
    .delete();
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
  changeMemePublicStatus
};