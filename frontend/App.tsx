import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, YellowBox } from "react-native";
import { BackButton, NativeRouter } from "react-router-native";
import { signInAnonymously } from "./helpers/firebase";
import Firebase from "./helpers/firebase_init";
import { Camera } from "expo-camera";
import { Routes } from "./components/Routes/Routes";
import { AuthContext } from "./context/AuthContext";
import { CameraContext } from "./context/CameraContext";

// No good fix for this, so this will do
YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  const [userId, setUserId] = useState("");
  const [appIsReady, setAppIsReady] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  signInAnonymously();
  useEffect(() => {
    handleCameraPermission();
    const unlisten = Firebase.auth().onAuthStateChanged((user: any) => {
      user && user.uid ? setUserId(user.uid) : "";
    });
    return () => {
      unlisten();
    };
  }, []);

  useEffect(() => {
    if (userId && hasCameraPermission) {
      setAppIsReady(true);
    }
  }, [hasCameraPermission, userId]);

  async function handleCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
    console.log(hasCameraPermission, "has permission");
  }

  return (
    <>
      {appIsReady ? (
        <CameraContext.Provider value={hasCameraPermission}>
          <AuthContext.Provider value={userId}>
            <NativeRouter>
              <BackButton>
                <View style={styles.container}>
                  <Routes />
                  <StatusBar style="auto" />
                </View>
              </BackButton>
            </NativeRouter>
          </AuthContext.Provider>
        </CameraContext.Provider>
      ) : (
        <View style={styles.container}></View>
      )}
    </>
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
