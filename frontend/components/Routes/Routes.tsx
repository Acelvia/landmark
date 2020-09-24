import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-native";
import CameraPage from "../CameraPage";
import VotingPage from "../VotingPage";
import { CurrentPhotoDataContext } from "../../context/CurrentPhotoDataContext";

export function Routes(props: any) {
  const [photoData, setPhotoData]: any = useState({ uri: "", landmarks: [] });
  const history = useHistory();

  useEffect(() => {
    if (photoData.uri) {
      history.push("/vote");
    }
  }, [photoData.uri]);

  function handleImageLocation(photoData: any) {
    setPhotoData(photoData);
  }

  return (
    <CurrentPhotoDataContext.Provider
      value={{ uri: photoData.uri, landmarks: [] }}
    >
      <Switch>
        <Route
          path="/"
          exact
          component={() => <CameraPage handlePhotoData={handleImageLocation} />}
        />
        <Route path="/vote" component={() => <VotingPage />} />
      </Switch>
    </CurrentPhotoDataContext.Provider>
  );
}
