import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text, Dimensions, StyleSheet } from "react-native";

// We're taking a "handleOnPress" prop here, but nothing seems to be passing it? VotingPage
// passes "onPress" instead. Using TypeScript typings should help in spotting problems like this
export function VoteButton({ disabled, handleOnPress, text }: any) {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      disabled={disabled}
      style={
        selected
          ? { ...styles.selectedVoteBtn, ...styles.flexChildGap }
          : { ...styles.voteBtn, ...styles.flexChildGap }
      }
      onPress={() => {
        handleOnPress(2); // handleOnPress(2)? What does the 2 mean? Would suggest enums.
        setSelected(true);
      }}
    >
      <Text style={selected ? styles.selectedVoteBtnText : styles.voteBtnText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flexChildGap: {
    marginVertical: 18,
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
