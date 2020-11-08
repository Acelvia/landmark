import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { LandmarkCamera } from "./LandmarkCamera";
import { LandmarkModal } from "./LandmarkModal";
import { validateLandmark } from "../helpers/api/vision";
import { CameraCapturedPicture } from "expo-camera";
import Firebase from "../helpers/firebase_init";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage() {
  const [base64Image, setBase64Image] = useState("");
  const [landmarkText, setLandmarkText] = useState("Is it a landmark ?");
  const [isLoading, setIsLoading] = useState(false);

  async function onPhoto(newPhoto: CameraCapturedPicture): Promise<any> {
    if (!newPhoto.base64) {
      return;
    }
    setIsLoading(true);
    try {
      const landmark = await identifyLandmark(newPhoto.uri);
      setBase64Image(newPhoto.base64);
      setLandmarkText(landmark || "Not a landmark");
      setIsLoading(false);
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
      ) : null}
      <LandmarkModal
        closeModal={() => setBase64Image("")}
        landmarkText={landmarkText}
        base64Image={base64Image}
      />
      <View style={styles.container}>
        <LandmarkCamera onPhoto={onPhoto} />
      </View>
    </>
  );
}

async function identifyLandmark(uri: string): Promise<string | undefined> {
  const photoId = `${Date.now()}`;
  await uploadImage(await (await fetch(uri)).blob(), photoId);
  const landmark = await validateLandmark(`${photoId}.jpg`);
  deleteImage(photoId);
  return landmark;
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
