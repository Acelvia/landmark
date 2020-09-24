import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { CircleButton } from "../CircleButton/CircleButton";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function LandmarkCamera({ onPhoto, children }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  let cameraRef: any = null;
  let componentWillUnmount = false;
  useEffect(() => {
    handleCameraPermission();

    return () => {
      componentWillUnmount = true;
      console.log("clean up");
    };
  }, []);

  async function handleCameraPermission() {
    if (componentWillUnmount) {
      return;
    }
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
    console.log(hasPermission, "has permission");
  }

  async function takePhoto(): Promise<any> {
    if (cameraRef !== null) {
      return await cameraRef.takePictureAsync();
    }
  }

  async function handleOnPress() {
    const newPhoto = await takePhoto();
    onPhoto(newPhoto);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centerTextContainer}>
        <Text>No access to camera</Text>
      </View>
    );
  }
  return (
    <Camera
      style={styles.container}
      type={Camera.Constants.Type.back}
      onCameraReady={() => setIsCameraReady(true)}
      ref={(ref) => {
        cameraRef = ref;
      }}
    >
      {children}
      <CircleButton handleOnPress={handleOnPress} disabled={!isCameraReady} />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  centerTextContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
