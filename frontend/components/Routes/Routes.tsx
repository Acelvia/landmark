import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-native";
import CameraPage from "../CameraPage";
import VotingPage from "../VotingPage";
import { CurrentPhotoDataContext } from "../../context/CurrentPhotoDataContext";

export function Routes(props: any) {
  const [uri, setUri] = useState("");
  const [landmarks, setLandmarks] = useState([]);
  const history = useHistory();

  /*useEffect(() => {
    if (uri) {
      history.push("/vote");
    }
  }, [uri]);
  */
  function handleImageLocation(photoData: any) {
    setUri(photoData.uri);
    setLandmarks(photoData.landmarks);
  }

  return (
    <CurrentPhotoDataContext.Provider
      value={{ uri: uri, setUri, landmarks: landmarks, setLandmarks }}
    >
      <Switch>
        <Route path="/" exact component={() => <CameraPage />} />
        <Route path="/vote" component={() => <VotingPage />} />
      </Switch>
    </CurrentPhotoDataContext.Provider>
  );
}
