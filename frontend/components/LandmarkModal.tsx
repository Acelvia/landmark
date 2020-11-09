import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";

interface Props {
  base64Image: string;
  landmarkText: string;
  closeModal: () => void;
}
export function LandmarkModal({
  base64Image,
  landmarkText,
  closeModal,
}: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={!!base64Image}>
      <View style={styles.modalContainer}>
        <Text style={styles.landmarkText}>{landmarkText}</Text>
        <Image
          style={{ ...styles.image }}
          source={{ uri: `data:image/jpg;base64,${base64Image}` }}
        />
        <TouchableHighlight
          style={{ ...styles.openButton }}
          onPress={closeModal}
        >
          <Text style={styles.textStyle}>OK</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#20232a",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 300,
    height: 320,
  },
  landmarkText: {
    color: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 42,
  },
});
