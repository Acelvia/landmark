import React, { useContext, useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { CircleButton } from "../CircleButton/CircleButton";
import { CameraContext } from "../../context/CameraContext";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height
const DESIRED_RATIO = "16:9";

export function LandmarkCamera({ onPhoto, children }: any) {
  // const [hasPermission, setHasPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [ratio, setRatio] = useState("");
  const hasPermission: boolean = useContext(CameraContext);
  let cameraRef: any = null;
  let componentWillUnmount = false;

  useEffect(() => {
    // handleCameraPermission();

    return () => {
      componentWillUnmount = true;
      console.log("clean up");
    };
  }, []);

  /*
  async function handleCameraPermission() {
    if (componentWillUnmount) {
      return;
    }
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === "granted");
    console.log(hasPermission, "has permission");
  }
*/
  async function takePhoto(): Promise<any> {
    if (cameraRef !== null) {
      return await cameraRef.takePictureAsync();
    }
  }

  async function handleOnPress() {
    const newPhoto = await takePhoto();
    onPhoto(newPhoto);
  }

  async function prepareRatio() {
    if (Platform.OS === "android" && cameraRef) {
      const ratios = await cameraRef.getSupportedRatiosAsync();
      // See if the current device has your desired ratio, otherwise get the maximum supported one
      // Usually the last element of "ratios" is the maximum supported ratio
      const ratio =
        ratios.find((ratio: string) => ratio === DESIRED_RATIO) ||
        ratios[ratios.length - 1];
      setRatio(ratio);
      setIsCameraReady(true);
    } else {
      setIsCameraReady(true);
    }
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
      ratio={ratio}
      style={{ ...styles.container }}
      type={Camera.Constants.Type.back}
      onCameraReady={() => prepareRatio()}
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
