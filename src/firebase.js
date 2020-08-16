import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC3bkMw2HWfMgKdeDWpGuEcWgv8KzHh9hA",
  authDomain: "instashop-81814.firebaseapp.com",
  databaseURL: "https://instashop-81814.firebaseio.com",
  projectId: "instashop-81814",
  storageBucket: "instashop-81814.appspot.com",
  messagingSenderId: "565045228068",
  appId: "1:565045228068:web:86368d064c02b8862d5eb1",
  measurementId: "G-J09PB3J276",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const dbRef = firebase.database().ref("videos")

export { db, auth, storage, dbRef };
