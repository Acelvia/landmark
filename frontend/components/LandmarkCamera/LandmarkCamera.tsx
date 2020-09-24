import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function LandmarkCamera({ setRef, onCameraReady, children }: any) {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const handleCameraPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      console.log(hasPermission, "has permission");
    };
    handleCameraPermission();
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Camera
      style={styles.container}
      type={Camera.Constants.Type.back}
      ref={(ref) => {
        setRef(ref);
      }}
      onCameraReady={() => onCameraReady(true)}
    >
      {children}
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
});
