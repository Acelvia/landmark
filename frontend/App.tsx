import React, { useState, useEffect } from "react";
import { StyleSheet, View, LogBox, Text } from "react-native";
import { Camera } from "expo-camera";
import { CameraPage } from "./components/CameraPage";
import Firebase from "./helpers/firebase_init";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const [userId, setUserId] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const appIsReady = !!userId && hasCameraPermission;

  useEffect(() => {
    (async () => {
      const { user } = await Firebase.auth().signInAnonymously();
      setUserId(user?.uid || "");
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  return (
    <View style={styles.container}>{appIsReady ? <CameraPage /> : null}</View>
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
