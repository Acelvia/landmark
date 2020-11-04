import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
interface Props {
  onPress: () => void;
  disabled: boolean;
}
export function CircleButton({ onPress, disabled }: Props) {
  return (
    <>
      {!disabled ? (
        <View style={styles.cameraBtnContainer}>
          <TouchableOpacity
            disabled={disabled}
            style={styles.cameraBtn}
            onPress={() => onPress()}
          >
            <View style={styles.cameraBtnInner}></View>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cameraBtnContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
  cameraBtn: {
    backgroundColor: "transparent",
    height: 50,
    width: 50,
    borderRadius: 100,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#2196F3",
    borderWidth: 1,
    padding: 1,
  },
  cameraBtnInner: {
    backgroundColor: "white",
    height: 42,
    width: 42,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 10,
  },
});
