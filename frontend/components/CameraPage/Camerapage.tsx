import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import CircleButton from "../CircleButton";
import Header from "../Header";
import LandmarkCamera from "../LandmarkCamera";
import Loading from "../Loading";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  let cameraRef: any = null;

  const handleOnPress = async () => {
    try {
      setIsLoading(true);
      const newPhoto = await takePhoto();
      handleNewPhoto(newPhoto);
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  };

  const takePhoto = async () => {
    if (cameraRef !== null) {
      return await cameraRef.takePictureAsync();
    }
  };

  const handleNewPhoto = (newPhoto: any) => {
    setPhoto(newPhoto);
    // Send photo file to backend and use vision api to validate if its a landmark or not
    console.log("Photo", newPhoto);
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
