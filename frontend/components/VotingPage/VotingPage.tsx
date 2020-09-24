import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
} from "react-native";
import { useHistory } from "react-router-native";
import { CurrentPhotoContext } from "../../context/CurrentPhotoContext";
import { uriToBase64 } from "../../helpers/uri";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function VotingPage() {
  const [base64Image, setBase64Image] = useState("");
  const history = useHistory();
  const photoLocation = useContext(CurrentPhotoContext);
  const setBase64Async = async (location: string) => {
    try {
      setBase64Image(await uriToBase64(location));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setBase64Async(photoLocation);
  }, [photoLocation]);

  const handleOnPress = () => {
    history.push("/");
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>
          VotingPage{JSON.stringify(photoLocation)}
        </Text>
        {photoLocation ? (
          <Image
            style={{ width: 250, height: 250 }}
            source={{ uri: `data:image/gif;base64,${base64Image}` }}
          ></Image>
        ) : (
          <></>
        )}
        <Button title="go back" onPress={() => handleOnPress()}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width,
    height,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
