import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

export function Header({ text }: any) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width,
    height: 85,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
});
