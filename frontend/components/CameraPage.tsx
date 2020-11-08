import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { LandmarkCamera } from "./LandmarkCamera";
import { LandmarkModal } from "./LandmarkModal";
import { validateLandmark } from "../helpers/api/vision";
import { CameraCapturedPicture } from "expo-camera";
import Firebase from "../helpers/firebase_init";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height
interface Props {
  anonymousUserId: string;
  hasCameraPermission: boolean;
}
export function CameraPage({ anonymousUserId, hasCameraPermission }: Props) {
  const [base64Image, setBase64Image] = useState("");
  const [landmarkText, setLandmarkText] = useState("Is it a landmark ?");
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function evaluateLandmark(landmarks: any[]): string {
    if (!landmarks || landmarks.length === 0) {
      return "NOT A LANDMARK";
    }
    return "LANDMARK ✔";
  }

  async function onPhoto(newPhoto: CameraCapturedPicture): Promise<any> {
    if (!newPhoto.base64) {
      return;
    }
    setIsLoading(true);
    try {
      if (!anonymousUserId) {
        throw new Error("No user");
      }
      const photoId = `${anonymousUserId}${Date.now()}`;
      await uploadImage(await (await fetch(newPhoto.uri)).blob(), photoId);
      setLandmarkText(
        evaluateLandmark(await validateLandmark(`${photoId}.jpg`))
      );
      await deleteImage(photoId);
      setBase64Image(newPhoto.base64);
      setIsLoading(false);
      setModalVisible(true);
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
        <LandmarkCamera
          hasCameraPermission={hasCameraPermission}
          onPhoto={onPhoto}
        />
      </View>
    </>
  );
}

async function uploadImage(
  blob: Blob,
  photoId: string
): Promise<firebase.storage.UploadTask> {
  const storageRef = Firebase.storage().ref();
  return await storageRef
    .child(`uploads/${photoId}.jpg`)
    .put(blob, { contentType: "image/jpeg" });
}

async function deleteImage(photoId: string): Promise<any> {
  const storageRef = Firebase.storage().ref();
  storageRef.child(`uploads/${photoId}.jpg`).delete();
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
