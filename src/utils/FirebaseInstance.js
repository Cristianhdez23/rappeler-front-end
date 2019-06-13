import firebase from "firebase";

const config = {
  apiKey: "AIzaSyA3VX_VKEo77UJxyqW4QRa9KWabtuCBBY8",
  authDomain: "rappeler-front.firebaseapp.com",
  databaseURL: "https://rappeler-front.firebaseio.com",
  projectId: "rappeler-front",
  storageBucket: "rappeler-front.appspot.com",
  messagingSenderId: "236568895787",
  appId: "1:236568895787:web:6f0d1440dbf086cf"
};

firebase.initializeApp(config);

export default firebase;
