import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDsNlcFYSzfJPQTCap4pqP6NgEb4e_1unk",
  authDomain: "rappeler-back.firebaseapp.com",
  databaseURL: "https://rappeler-back.firebaseio.com",
  projectId: "rappeler-back",
  storageBucket: "rappeler-back.appspot.com",
  messagingSenderId: "149244580669",
  appId: "1:149244580669:web:13c047dbd5ca3f57"
};

firebase.initializeApp(config);

export default firebase;
