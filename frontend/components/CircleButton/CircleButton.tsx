import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export function CircleButton({ handleOnPress }: any) {
  return (
    <View style={styles.cameraBtnContainer}>
      <TouchableOpacity
        style={styles.cameraBtn}
        onPress={handleOnPress}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraBtnContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  cameraBtn: {
    backgroundColor: "white",
    height: 40,
    width: 25,
    borderRadius: 100,
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1,
  },
});
