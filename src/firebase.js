import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDRKEPSfsvlyueuDrA5VAsINoJk6FB-Rqk",
  authDomain: "instagram-clone-ak.firebaseapp.com",
  projectId: "instagram-clone-ak",
  storageBucket: "instagram-clone-ak.appspot.com",
  messagingSenderId: "194414203717",
  appId: "1:194414203717:web:8698e7d87712158ef9242c",
  measurementId: "G-CL8ZYG5ZPT"

})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}