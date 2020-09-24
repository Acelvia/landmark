import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Route, useHistory } from "react-router-native";
import { PrivateRoute } from "./PrivateRoute";
import CameraPage from "../CameraPage";
import { auth } from "../../helpers/api/auth";
import VotingPage from "../VotingPage";
import { CurrentPhotoContext } from "../../context/CurrentPhotoContext";

export function Routes(props: any) {
  const [imageLocation, setImageLocation] = useState("");
  const handleImageLocation = (image: string) => {
    setImageLocation(image);
  };
  return (
    <CurrentPhotoContext.Provider value={imageLocation}>
      <View>
        <Route
          path="/"
          exact
          component={() => <CameraPage imageLocation={handleImageLocation} />}
        />
        <Route path="/vote" component={() => <VotingPage />} />
      </View>
    </CurrentPhotoContext.Provider>
  );
}
