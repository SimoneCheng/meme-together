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

async function checkLoginStatus(dispatch, setUserData) {
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
async function getAllTemplates() {
  return db
    .collection('templates')
    .get()
    .then((querySnapshot) => {
      const templatesData = [];
      querySnapshot.forEach(doc => {
        templatesData.push(doc.data());
      })
      return templatesData;
    })
}

// Meme-generator Page
async function getTheTemplate(id) {
  return db
    .collection('templates')
    .doc(id)
    .get()
    .then((snapShot) => snapShot.data());
}

// Get Timestamp
function getTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

// Functions for Member
function getUserInfo(id) {
  return db
    .collection('users')
    .doc(id)
    .get()
    .then((snapShot) => snapShot.data());
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

function getAllEditingMeme(id, dispatch, setAllEditingMeme) {
  return db
    .collection('users')
    .doc(id)
    .collection('editing_meme')
    .onSnapshot((querySnapshot) => {
      const allEditingMemeData = [];
      querySnapshot.forEach(doc => {
        allEditingMemeData.push({ data: doc.data(), docId: doc.id });
      })
     dispatch(setAllEditingMeme(allEditingMemeData));
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

export {
  nativeSignup,
  nativeLogin,
  nativeLogout,
  checkLoginStatus,
  getAllTemplates,
  getTheTemplate,
  getTimestamp,
  saveEditingMeme,
  updateEditingMeme,
  getAllEditingMeme,
  getUserInfo,
  getTheEditingMeme
};