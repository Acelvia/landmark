import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import Header from "../Header";
import LandmarkCamera from "../LandmarkCamera";
import { vision } from "../../helpers/api/vision";
import { uriToBlob } from "../../helpers/uri";
import { deleteImage, uploadImage } from "../../helpers/firebase";
import { AuthContext } from "../../context/AuthContext";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage({ handlePhotoData }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [uri, setUri] = useState("");
  const [landmarks, setLandmarks] = useState([]);
  const anonymousUserId = useContext(AuthContext);

  useEffect(() => {
    if (uri) {
      handlePhotoData({ uri, landmarks });
    }
  }, [uri]);

  async function handleOnPhoto(newPhoto: any): Promise<any> {
    try {
      setIsLoading(true);
      // const newPhoto = await takePhoto();
      await handleNewPhoto(newPhoto);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleNewPhoto(newPhoto: any): Promise<any> {
    try {
      if (!anonymousUserId) {
        throw new Error("No user");
      }
      // Send photo file to backend and use vision api to validate if its a landmark or not
      const blob = await uriToBlob(newPhoto.uri);
      const photoId = `${anonymousUserId}${Date.now()}`;
      console.log(photoId);
      await uploadImage(blob, photoId);
      // Api request here
      const landmarkRes = await vision.validateLandmark(`${photoId}.jpg`);
      console.log(landmarkRes, "landmarkRes");
      await deleteImage(photoId);
      setIsLoading(false);
      setLandmarks(landmarkRes);
      setUri(newPhoto.uri);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.container}>
        <LandmarkCamera onPhoto={handleOnPhoto}>
          <Header text={"Is this a landmark ?"} />
        </LandmarkCamera>
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
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
