import React, { useState, useEffect } from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { Camera } from "expo-camera";
import { CameraPage } from "./components/CameraPage";
import Firebase from "./helpers/firebase_init";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [userId, setUserId] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const appIsReady = !!userId && hasCameraPermission;

  useEffect(() => {
    handleCameraPermission();
    Firebase.auth()
      .signInAnonymously()
      .then(({ user }) => setUserId(user?.uid || ""));
  }, []);

  async function handleCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
  }

  return (
    <View style={styles.container}>
      {appIsReady ? <CameraPage anonymousUserId={userId} /> : null}
    </View>
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
