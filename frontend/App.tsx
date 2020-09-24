import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, YellowBox } from "react-native";
import { NativeRouter } from "react-router-native";
import { Routes } from "./components/Routes/Routes";
import { AuthContext } from "./context/AuthContext";
import { signInAnonymously } from "./helpers/firebase";
import Firebase from "./helpers/firebase_init";

// No good fix for this, so this will do
YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  const [userId, setUserId] = useState("");
  signInAnonymously();
  useEffect(() => {
    const unlisten = Firebase.auth().onAuthStateChanged((user: any) => {
      user && user.uid ? setUserId(user.uid) : "";
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <>
      {userId ? (
        <AuthContext.Provider value={userId}>
          <NativeRouter>
            <View style={styles.container}>
              <Routes />
              <StatusBar style="auto" />
            </View>
          </NativeRouter>
        </AuthContext.Provider>
      ) : (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
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
