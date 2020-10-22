import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Header from "../Header";
import LandmarkCamera from "../LandmarkCamera";
import Loading from "../Loading";
import { vision } from "../../helpers/api/vision";
import { uriToBlob } from "../../helpers/uri";
import { deleteImage, uploadImage } from "../../helpers/firebase";
import { AuthContext } from "../../context/AuthContext";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

/* typically I declare React typescript components something like
interface Props {
  handlePhotoData: any; // type goes here instead of any, of course
}
const CameraPage : React.FC<Props> = () => {
...
}
export default CameraPage;

The approach below is peroblematic, because it types the return type as any. Google "typescript react cheat sheet", it has all of this stuff.
*/
export function CameraPage({ handlePhotoData }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [uri, setUri] = useState("");
  const [landmarks, setLandmarks] = useState([]);
  const anonymousUserId = useContext(AuthContext);

  useEffect(() => {
    if (uri) {
      handlePhotoData({ uri, landmarks });
    }
  }, [uri]);

  // All this function seems to add to the handleNewPhoto is "setIsLoading(true)". Is there
  // value or just more complexity? Would remove it?
  async function handleOnPhoto(newPhoto: any): Promise<any> {
    try {
      setIsLoading(true);
      // const newPhoto = await takePhoto();  // No commented out code in repos, ever. Kill it with fire.
      await handleNewPhoto(newPhoto);
    } catch (e) {
      // This is generally a bad idea. "Catch-and-log" is _usually_ a bad way to handle errors (not always, of course)
      // Most times it's best to just let exceptions bubble high up and let the app crash. Catch and log just hides the problem.
      console.log(e);
    }
  }

  // When typing things as "any", we're losing the value added by TypeScript. Would change into proper
  // typings. As said in a different comment, eslint is good for spotting stuff like this
  async function handleNewPhoto(newPhoto: any): Promise<any> {
    try {
      if (!anonymousUserId) {
        throw new Error("No user");
      }
      // Send photo file to backend and use vision api to validate if its a landmark or not
      const blob = await uriToBlob(newPhoto.uri);
      const photoId = `${anonymousUserId}${Date.now()}`;
      // console.log's in codebase is typically a bad idea. OK when you're hacking on something, but remove afterwards.
      // console.log typically isn't proper logging (how would you get the logs from the client's phone?)
      console.log(photoId);
      const snapshot = await uploadImage(blob, photoId); // snapshot is unused
      // Api request here
      const landmarkRes = await vision.validateLandmark(`${photoId}.jpg`);
      console.log(landmarkRes, "landmarkRes");
      await deleteImage(photoId);
      setIsLoading(false);
      setLandmarks(landmarkRes);
      setUri(newPhoto.uri);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    // We could simplify this by just returning "<Loading>" if it isLoading and the <View> if it is not; no need for the empty fragments?
    <>
      {isLoading ? <Loading width={width} height={height} /> : <></>}
      <View style={styles.container}>
        <LandmarkCamera onPhoto={handleOnPhoto}>
          <Header text={"Is this a landmark ?"} />
        </LandmarkCamera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
});
