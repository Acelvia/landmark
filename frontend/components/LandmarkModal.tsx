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
  modalVisible: boolean;
  base64Image: string;
  landmarkText: string;
  setModalVisible: (modalVisible: boolean) => void;
}
export function LandmarkModal({
  modalVisible,
  base64Image,
  landmarkText,
  setModalVisible,
}: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.landmarkText}>{landmarkText}</Text>
        <Image
          style={{ width: 300, height: 320 }}
          source={{ uri: `data:image/jpg;base64,${base64Image}` }}
        />
        <TouchableHighlight
          style={{ ...styles.openButton }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
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
