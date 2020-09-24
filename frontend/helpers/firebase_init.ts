// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyAr0T4Zf5TaqZJcz86y_XLwIQX5b3epkXM",
  authDomain: "landmark-e738f.firebaseapp.com",
  databaseURL: "https://landmark-e738f.firebaseio.com",
  projectId: "landmark-e738f",
  storageBucket: "landmark-e738f.appspot.com",
  appId: "534472241145",
  measurementId: "G-MEASUREMENT_ID",
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
