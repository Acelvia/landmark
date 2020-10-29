import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, LogBox } from "react-native";
import { BackButton, NativeRouter } from "react-router-native";
import { signInAnonymously } from "./helpers/firebase";
import Firebase from "./helpers/firebase_init";
import * as SplashScreen from "expo-splash-screen";
import { Camera } from "expo-camera";
import { Routes } from "./components/Routes/Routes";
import { AuthContext } from "./context/AuthContext";
import { CameraContext } from "./context/CameraContext";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [userId, setUserId] = useState("");
  const [appIsReady, setAppIsReady] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  signInAnonymously();
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
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
      hideSplashScreen();
    }
  }, [hasCameraPermission, userId]);

  async function hideSplashScreen() {
    await SplashScreen.hideAsync();
    setAppIsReady(true);
  }

  async function handleCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
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
