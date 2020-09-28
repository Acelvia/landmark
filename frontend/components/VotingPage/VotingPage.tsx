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
import { AuthContext } from "../../context/AuthContext";
import { CurrentPhotoDataContext } from "../../context/CurrentPhotoDataContext";
import {
  saveUserCorrectSelection,
  saveUserIncorrectSelection,
} from "../../helpers/firebase";
import { uriToBase64 } from "../../helpers/uri";
import Header from "../Header";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export function VotingPage() {
  const [base64Image, setBase64Image] = useState("");
  const [userSelection, setUserSelection] = useState(0);
  const [disableVoteButton, setDisableVoteButton] = useState(false);
  const [selectedNo, setSelectedNo] = useState(false);
  const [selectedYes, setSelectedYes] = useState(false);
  const history = useHistory();
  const userId = useContext(AuthContext);
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
    setDisableVoteButton(true);
  }

  function setImageHeaderText(): any {
    switch (userSelection) {
      case 2: // I think its a landmark
        if (!landmarks || landmarks.length === 0) {
          return (
            <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
              {"NOT A LANDMARK "}
              {/* <Text style={{ color: "#ED2939" }}> ✘</Text>*/}
            </Text>
          );
        }
        // Confirmed it is a landmark
        saveUserCorrectSelection(landmarks[0].description, userId);
        return (
          <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
            {"LANDMARK"}
            <Text> ✔</Text>
            {/* style={{ color: "#28a745" }} */}
          </Text>
        );
      case 1: // I dont think its a landmark
        if (!landmarks || landmarks.length === 0) {
          return (
            <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
              {"NOT A LANDMARK "}
              <Text> ✔</Text>
              {/* style={{ color: "#28a745" }} */}
            </Text>
          );
        }
        // Confirmed it is a landmark
        saveUserIncorrectSelection(landmarks[0].description, userId);
        return (
          <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
            {"LANDMARK"}
            {/*  <Text style={{ color: "#ED2939" }}>✘</Text>*/}
          </Text>
        );
      default:
        return (
          <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
            {"Is it a landmark ?"}
          </Text>
        );
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {setImageHeaderText()}

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
          disabled={disableVoteButton}
          style={
            selectedYes
              ? { ...styles.selectedVoteBtn, ...styles.flexChildGap }
              : { ...styles.voteBtn, ...styles.flexChildGap }
          }
          onPress={() => {
            handleOnPress(2);
            setSelectedYes(true);
          }}
        >
          <Text
            style={
              selectedYes ? styles.selectedVoteBtnText : styles.voteBtnText
            }
          >
            I think it's a landmark
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableVoteButton}
          style={
            selectedNo
              ? {
                  ...styles.selectedVoteBtn,
                  ...styles.flexChildGap,
                  marginBottom: 35,
                }
              : {
                  ...styles.voteBtn,
                  ...styles.flexChildGap,
                  marginBottom: 35,
                }
          }
          onPress={() => {
            handleOnPress(1);
            setSelectedNo(true);
          }}
        >
          <Text
            style={selectedNo ? styles.selectedVoteBtnText : styles.voteBtnText}
          >
            I don't think it's a landmark
          </Text>
        </TouchableOpacity>
        {/*<Button title="back " onPress={() => history.push("/")}></Button> Button ignoring last char for some reason */}
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
  selectedVoteBtn: {
    borderRadius: 20,
    borderColor: "#fff",
    backgroundColor: "#fff",
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
  selectedVoteBtnText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
});
