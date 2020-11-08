import React, { useState } from "react";
import { Camera, CameraCapturedPicture } from "expo-camera";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { CircleButton } from "./CircleButton";

const width = Dimensions.get("window").width; //full width
const DESIRED_RATIO = "16:9";
interface Props {
  onPhoto: (photo: CameraCapturedPicture) => Promise<any>;
}
export function LandmarkCamera({ onPhoto }: Props) {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [ratio, setRatio] = useState("");
  let cameraRef: Camera;
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
    }
    setIsCameraReady(true);
  }

  return (
    <Camera
      ratio={ratio}
      style={{ ...styles.container }}
      type={Camera.Constants.Type.back}
      onCameraReady={prepareRatio}
      ref={(ref: Camera) => {
        cameraRef = ref;
      }}
    >
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
