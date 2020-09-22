import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { Routes } from "./components/Routes/Routes";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/storage";

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyAr0T4Zf5TaqZJcz86y_XLwIQX5b3epkXM",
  projectId: "landmark-e738f",
  storageBucket: "landmark-e738f.appspot.com",
  appId: "534472241145",
  measurementId: "G-MEASUREMENT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Routes />
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
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
