import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr0T4Zf5TaqZJcz86y_XLwIQX5b3epkXM",
  authDomain: "landmark-e738f.firebaseapp.com",
  databaseURL: "https://landmark-e738f.firebaseio.com",
  projectId: "landmark-e738f",
  storageBucket: "landmark-e738f.appspot.com",
  appId: "534472241145",
  measurementId: "G-MEASUREMENT_ID",
};
const Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default Firebase;
