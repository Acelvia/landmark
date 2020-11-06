import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
const projectId = "landmark-e738f";
const firebaseConfig = {
  apiKey: "AIzaSyAr0T4Zf5TaqZJcz86y_XLwIQX5b3epkXM",
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`,
  appId: "534472241145", // "Project number" in Firebase Console
  measurementId: "G-MEASUREMENT_ID",
};
const Firebase = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default Firebase;
