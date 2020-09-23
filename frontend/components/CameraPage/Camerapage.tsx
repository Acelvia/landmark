import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import CircleButton from "../CircleButton";
import Header from "../Header";
import LandmarkCamera from "../LandmarkCamera";
import Loading from "../Loading";
import { vision } from "../../helpers/api/vision";
import useFirebaseAuthentication from "../../hooks";
import { uploadToFirebase, uriToBlob } from "./helpers";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage() {
  const [isLoading, setIsLoading] = useState(false);
  // const [photo, setPhoto] = useState(null);
  const anonymousUser: any = useFirebaseAuthentication();
  let cameraRef: any = null;

  const handleOnPress = async () => {
    try {
      setIsLoading(true);
      const newPhoto = await takePhoto();
      await handleNewPhoto(newPhoto);
      setIsLoading(false);
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
      // Send photo file to backend and use vision api to validate if its a landmark or not
      const blob = await uriToBlob(newPhoto.uri);
      const photoId = `${anonymousUser.uid}${Date.now()}`;
      const snapshot = await uploadToFirebase(blob, photoId);
      // Api request here
      const landmarkRes = await vision.validateLandmark();
      console.log(landmarkRes, "landmarkRes");
      // show new screen with data
    } catch (error) {
      console.log(error);
    }
    // Maybe delete photo
  };

  const setLandmarkCameraRef = (ref: any) => {
    cameraRef = ref;
  };

  return (
    <>
      {isLoading ? <Loading width={width} height={height} /> : <></>}
      <View style={styles.container}>
        <LandmarkCamera setRef={setLandmarkCameraRef}>
          <Header />
          <CircleButton handleOnPress={handleOnPress} />
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
