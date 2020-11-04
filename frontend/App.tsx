import React, { useState, useEffect } from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { signInAnonymously } from "./helpers/firebase";
import Firebase from "./helpers/firebase_init";
import { Camera } from "expo-camera";
import { CameraPage } from "./components/CameraPage";

LogBox.ignoreLogs(["Setting a timer"]);

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
  }

  return (
    <>
      {appIsReady ? (
        <View style={styles.container}>
          <CameraPage
            anonymousUserId={userId}
            hasCameraPermission={hasCameraPermission}
          />
        </View>
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
