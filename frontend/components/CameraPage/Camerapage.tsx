import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import CircleButton from "../CircleButton";
import Header from "../Header";
import LandmarkCamera from "../LandmarkCamera";
import Loading from "../Loading";
import { vision } from "../../helpers/api/vision";
import Firebase from "../../helpers/firebase";
import useFirebaseAuthentication from "../../hooks";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const anonymousUser = useFirebaseAuthentication();
  let cameraRef: any = null;

  const uriToBlob = (uri: string) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        // something went wrong
        reject(new Error("uriToBlob failed"));
      };

      // this helps us get a blob
      xhr.responseType = "blob";

      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  };

  const uploadToFirebase = (blob: any) => {
    return new Promise((resolve, reject) => {
      console.log(anonymousUser);
      var storageRef = Firebase.storage().ref();

      storageRef
        .child("uploads/photo.jpg")
        .put(blob, {
          contentType: "image/jpeg",
        })
        .then((snapshot) => {
          blob.close();

          resolve(snapshot);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

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
    setPhoto(newPhoto);
    try {
      // Send photo file to backend and use vision api to validate if its a landmark or not
      const blob = await uriToBlob(newPhoto.uri);
      const snapshot = await uploadToFirebase(blob);
      // Api request here
      const landmarkRes = await vision.validateLandmark();
      console.log(landmarkRes, "landmarkRes");
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
