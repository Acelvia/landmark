import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { withRouter } from "react-router-native";
import Loading from "../Loading";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function CameraPage() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let cameraRef: any = null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      console.log(hasPermission, "has permission");
      console.log(photo !== null, "photo not null");
    })();
  }, []);

  const handleOnPress = async () => {
    console.log("handle on press");
    try {
      setIsLoading(true);
      const _photo = await takePicture();
      setPhoto(_photo);
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    } catch (e) {
      console.log(e);
    }
  };

  const takePicture = async () => {
    if (cameraRef !== null) {
      return await cameraRef.takePictureAsync();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      {isLoading ? <Loading width={width} height={height} /> : <></>}
      <View style={styles.container}>
        <Camera
          style={styles.container}
          type={type}
          ref={(ref) => {
            cameraRef = ref;
          }}
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>Is this a land mark ?</Text>
          </View>
          <View style={styles.cameraBtnContainer}>
            <TouchableOpacity
              style={styles.cameraBtn}
              onPress={handleOnPress}
            ></TouchableOpacity>
          </View>
        </Camera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  header: {
    width,
    height: 85,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },
  cameraBtnContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  cameraBtn: {
    backgroundColor: "white",
    height: 40,
    width: 25,
    borderRadius: 100,
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 1,
  },
});
