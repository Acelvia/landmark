import React, { useState, useContext } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import LandmarkCamera from "../LandmarkCamera";
import LandmarkModal from "../LandmarkModal";
import { vision } from "../../helpers/api/vision";
import { uriToBlob, uriToBase64 } from "../../helpers/uri";
import { deleteImage, uploadImage } from "../../helpers/firebase";
import { AuthContext } from "../../context/AuthContext";
import { CameraCapturedPicture } from "expo-camera";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage() {
  const [base64Image, setBase64Image] = useState("");
  const [landmarkText, setLandmarkText] = useState("Is it a landmark ?");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const anonymousUserId = useContext(AuthContext);

  function evaluateLandmark(landmarks: any[]): string {
    if (!landmarks || landmarks.length === 0) {
      return "NOT A LANDMARK";
    }
    return "LANDMARK ✔";
  }

  async function setBase64Async(uri: string) {
    setBase64Image(await uriToBase64(uri));
  }

  async function onPhoto(newPhoto: CameraCapturedPicture): Promise<any> {
    setIsLoading(true);

    try {
      if (!anonymousUserId) {
        throw new Error("No user");
      }
      // Send photo file to backend and use vision api to validate if its a landmark or not
      const blob = await uriToBlob(newPhoto.uri);
      const photoId = `${anonymousUserId}${Date.now()}`;
      await uploadImage(blob, photoId);
      // Api request here
      const landmarkRes = await vision.validateLandmark(`${photoId}.jpg`);
      await deleteImage(photoId);
      await setBase64Async(newPhoto.uri);
      setIsLoading(false);
      setModalVisible(true);
      setLandmarkText(evaluateLandmark(landmarkRes));
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  return (
    <>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      ) : (
        <></>
      )}
      <LandmarkModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        landmarkText={landmarkText}
        base64Image={base64Image}
      />
      <View style={styles.container}>
        <LandmarkCamera onPhoto={onPhoto} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  loaderContainer: {
    width,
    height,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
