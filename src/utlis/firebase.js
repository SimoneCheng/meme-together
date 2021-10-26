import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import env from "react-dotenv";

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId,
  measurementId: env.measurementId
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
        photoURL: env.defaultProfileImg
      })
      db.collection('users').doc(user.uid).set({
        user_id: user.uid,
        user_email: user.email,
        user_name: name,
        user_img: env.defaultProfileImg,
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
        const userData = {
          user_id: user.uid,
          user_email: user.email,
          user_name: user.displayName
        };
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
    .then((snapShot) => snapShot.data())
}

// Get Timestamp
function getTimestamp() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export {
  nativeSignup,
  nativeLogin,
  nativeLogout,
  checkLoginStatus,
  getAllTemplates,
  getTheTemplate,
  getTimestamp
};