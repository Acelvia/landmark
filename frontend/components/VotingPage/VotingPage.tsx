import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import VoteButton from "../VoteButton";
import { AuthContext } from "../../context/AuthContext";
import { CurrentPhotoDataContext } from "../../context/CurrentPhotoDataContext";
import {
  saveUserCorrectSelection,
  saveUserIncorrectSelection,
} from "../../helpers/firebase";
import { uriToBase64 } from "../../helpers/uri";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

enum UserVote {
  AFFIRMATIVE = "AFFIRMATIVE",
  NEGATIVE = "NEGATIVE",
}

export function VotingPage() {
  const [base64Image, setBase64Image] = useState("");
  const [userSelection, setUserSelection] = useState("");
  const [disableVoteButton, setDisableVoteButton] = useState(false);
  const userId = useContext(AuthContext);
  const { uri, landmarks }: any = useContext(CurrentPhotoDataContext);

  useEffect(() => {
    setBase64Async(uri);
  }, [uri]);

  async function setBase64Async(location: string) {
    try {
      setBase64Image(await uriToBase64(location));
    } catch (e) {
      throw new Error(e);
    }
  }

  function onAffirmativePress() {
    setDisableVoteButton(true);
    setUserSelection(UserVote.AFFIRMATIVE);
  }

  function onNegativePress() {
    setDisableVoteButton(true);
    setUserSelection(UserVote.NEGATIVE);
  }

  function setImageHeaderText(): any {
    switch (userSelection) {
      // I think its a landmark
      case UserVote.AFFIRMATIVE:
        if (!landmarks || landmarks.length === 0) {
          return (
            <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
              NOT A LANDMARK
            </Text>
          );
        }
        // Confirmed it is a landmark
        saveUserCorrectSelection(landmarks[0].description, userId);
        return (
          <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
            LANDMARK
            <Text> ✔</Text>
          </Text>
        );
      // I dont think its a landmark
      case UserVote.NEGATIVE:
        if (!landmarks || landmarks.length === 0) {
          return (
            <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
              NOT A LANDMARK
              <Text> ✔</Text>
            </Text>
          );
        }
        // Confirmed it is a landmark
        saveUserIncorrectSelection(landmarks[0].description, userId);
        return (
          <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
            LANDMARK
          </Text>
        );
      default:
        return (
          <Text style={{ ...styles.imageText, ...styles.flexChildGap }}>
            Is it a landmark ?
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
        <VoteButton
          text="I think it's a landmark"
          disabled={disableVoteButton}
          onPress={onAffirmativePress}
        />
        <VoteButton
          text="I don't think it's a landmark"
          disabled={disableVoteButton}
          onPress={onNegativePress}
        />
        <Text style={{ ...styles.flexChildGap, ...styles.googleText }}>
          Select and see what Google thinks
        </Text>
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
    color: "#fff",
    textAlign: "center",
  },
  googleText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});
