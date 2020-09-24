import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import CircleButton from "../CircleButton";
import Header from "../Header";
import LandmarkCamera from "../LandmarkCamera";
import Loading from "../Loading";
import { vision } from "../../helpers/api/vision";
import useFirebaseAuthentication from "../../hooks";
import { uriToBase64, uriToBlob } from "../../helpers/uri";
import { deleteImage, uploadImage } from "../../helpers/firebase";
import { Redirect, useHistory } from "react-router-native";
import { CurrentPhotoContext } from "../../context/CurrentPhotoContext";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage({ imageLocation }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const anonymousUser: any = useFirebaseAuthentication();
  const history = useHistory();
  let cameraRef: any = null;

  const handleOnPress = async () => {
    try {
      console.log("button pressed");
      setIsLoading(true);
      const newPhoto = await takePhoto();
      await handleNewPhoto(newPhoto);
    } catch (e) {
      console.log(e);
    }
  };

  const takePhoto = async () => {
    if (cameraRef !== null) {
      return await cameraRef.takePictureAsync();
    }
  };

  const handleNewPhoto = async (newPhoto: any) => {
    try {
      if (!anonymousUser) {
        throw new Error("No user");
      }
      imageLocation(newPhoto.uri);
      // Send photo file to backend and use vision api to validate if its a landmark or not
      const blob = await uriToBlob(newPhoto.uri);
      const photoId = `${anonymousUser.uid}${Date.now()}`;
      const snapshot = await uploadImage(blob, photoId);
      // Api request here
      const landmarkRes = await vision.validateLandmark(photoId);
      console.log(landmarkRes, "landmarkRes");
      await deleteImage(photoId);
      setIsLoading(false);
      history.push("/vote");
      // show new screen with data
    } catch (error) {
      console.log(error);
    }
  };

  const setLandmarkCameraRef = (ref: any) => {
    cameraRef = ref;
  };

  const handleCameraReady = (ready: boolean) => {
    console.log("camera is ready");
    setIsCameraReady(ready);
  };

  return (
    <>
      {isLoading ? <Loading width={width} height={height} /> : <></>}
      <View style={styles.container}>
        <LandmarkCamera
          setRef={setLandmarkCameraRef}
          onCameraReady={handleCameraReady}
        >
          <Header />
          <CircleButton
            handleOnPress={handleOnPress}
            disabled={!isCameraReady}
          />
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
});
