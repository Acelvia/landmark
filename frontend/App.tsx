import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { Routes } from "./components/Routes/Routes";
import { AuthContext } from "./context/AuthContext";
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
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anonymousUser, setAnonymousUser] = useState(null);
  firebase
    .auth()
    .signInAnonymously()
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        // User is signed in.
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        setIsAuthenticated(isAnonymous);
        setAnonymousUser(user);
      } else {
        // User is signed out.
        setIsAuthenticated(false);
        setAnonymousUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user: anonymousUser }}>
      <NativeRouter>
        <View style={styles.container}>
          <Routes />
          <StatusBar style="auto" />
        </View>
      </NativeRouter>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
