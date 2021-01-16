
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDX26AIMWZ_ntV6BmVGa6IhPguYNeJOPvs",
    authDomain: "app-592dc.firebaseapp.com",
    databaseURL: "https://app-592dc.firebaseio.com",
    projectId: "app-592dc",
    storageBucket: "app-592dc.appspot.com",
    messagingSenderId: "411315052796",
    appId: "1:411315052796:web:e2ac1433c285f3bdfbb779",
    measurementId: "G-76M1Y31P5H"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

export { db, auth };