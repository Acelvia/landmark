import { createContext } from "react";

export const CurrentPhotoDataContext = createContext({
  uri: "",
  landmarks: [],
});
