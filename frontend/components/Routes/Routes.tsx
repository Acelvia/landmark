import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-native";
import CameraPage from "../CameraPage";
import VotingPage from "../VotingPage";
import { CurrentPhotoDataContext } from "../../context/CurrentPhotoDataContext";

export function Routes(props: any) {
  // Shouldn't take props if you don't use 'em
  const [photoData, setPhotoData]: any = useState({ uri: "", landmarks: [] }); // typing stuff to "any" is generally a bad practice; add eslint to the project to weed these out
  const history = useHistory();

  useEffect(() => {
    if (photoData.uri) {
      // This looks like we monitor the photoData contents and use it to change the route? If so, that's unusual, typically it's done differently
      history.push("/vote");
    }
  }, [photoData.uri]);

  function handleImageLocation(photoData: any) {
    // What's the benefit of this function vs. just passing "setPhotoData" itself down?
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
