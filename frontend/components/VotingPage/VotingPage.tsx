import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useHistory } from "react-router-native";
import { CurrentPhotoDataContext } from "../../context/CurrentPhotoDataContext";
import { uriToBase64 } from "../../helpers/uri";
import Header from "../Header";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function VotingPage() {
  const [base64Image, setBase64Image] = useState("");
  const [userSelection, setUserSelection] = useState(0);
  const history = useHistory();
  const { uri, landmarks }: any = useContext(CurrentPhotoDataContext);
  const setBase64Async = async (location: string) => {
    try {
      setBase64Image(await uriToBase64(location));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setBase64Async(uri);
  }, [uri]);

  function handleOnPress(selection: number) {
    setUserSelection(selection);
  }

  function setImageHeaderText(): string {
    switch (userSelection) {
      case 1: // I dont think its a landmark
        if (!landmarks || landmarks.length === 0) {
          return "It is not a landmark ✔";
        }
        return "It is a landmark! ✘";
      case 2: // I think its a landmark
        if (!landmarks || landmarks.length === 0) {
          return "It is not a landmark ✘";
        }
        return "It is a landmark! ✔";

      default:
        return "Is it a landmark ?";
    }
  }

  return (
    <View style={styles.outerContainer}>
      <Header text={"Read more"} />
      <View style={styles.container}>
        <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
          {setImageHeaderText()}
        </Text>
        {uri ? (
          <Image
            style={{ width: 300, height: 320, ...styles.flexChildGap }}
            source={{ uri: `data:image/gif;base64,${base64Image}` }}
          ></Image>
        ) : (
          <></>
        )}
        <Text style={{ ...styles.flexChildGap, ...styles.googleText }}>
          Select and see what Google thinks
        </Text>
        <TouchableOpacity
          style={{ ...styles.voteBtn, ...styles.flexChildGap }}
          onPress={() => handleOnPress(2)}
        >
          <Text style={styles.voteBtnText}>I think it's a landmark</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.voteBtn,
            ...styles.flexChildGap,
            marginBottom: 35,
          }}
          onPress={() => handleOnPress(1)}
        >
          <Text style={styles.voteBtnText}>I don't think it's a landmark</Text>
        </TouchableOpacity>
        {/* Button ignoring last char for some reason */}
        <Button title="backk" onPress={() => history.push("/")}></Button>
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
  flexChildGap: {
    marginVertical: 18,
  },
  imageText: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  googleText: {
    fontSize: 12,
    // fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  voteBtn: {
    color: "#fff",
    borderRadius: 20,
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: 300,
    marginBottom: 5,
  },
  voteBtnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
