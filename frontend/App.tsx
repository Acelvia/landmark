import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter } from "react-router-native";
import { Routes } from "./components/Routes/Routes";
import { AuthContext } from "./context/AuthContext";
import Firebase from "./helpers/firebase";
import useFirebaseAuthentication from "./hooks";

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
