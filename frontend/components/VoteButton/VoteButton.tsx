import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text, Dimensions, StyleSheet } from "react-native";

interface Props {
  disabled: boolean;
  onPress: () => void;
  text: string;
}
export function VoteButton({ disabled, onPress, text }: Props) {
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
        onPress();
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
