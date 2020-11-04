import React, { useContext, useState } from "react";
import { Camera } from "expo-camera";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { CircleButton } from "../CircleButton/CircleButton";
import { CameraContext } from "../../context/CameraContext";

const width = Dimensions.get("window").width; //full width
const DESIRED_RATIO = "16:9";
interface Props {
  onPhoto: (photo: any) => Promise<any>;
  children?: JSX.Element;
}
export function LandmarkCamera({ onPhoto, children }: Props) {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [ratio, setRatio] = useState("");
  const hasPermission: boolean = useContext(CameraContext);
  let cameraRef: Camera | null = null;

  async function onPress() {
    if (cameraRef !== null) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      onPhoto(photo);
    }
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
      ref={(ref: Camera) => {
        cameraRef = ref;
      }}
    >
      {children}
      <CircleButton onPress={onPress} disabled={!isCameraReady} />
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
