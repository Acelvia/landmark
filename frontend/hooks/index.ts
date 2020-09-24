import React, { useState, useEffect } from "react";
import Firebase from "../helpers/firebase_init";
const useFirebaseAuthentication = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unlisten = Firebase.auth().onAuthStateChanged((authUser: any) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
  });

  return authUser;
};
export default useFirebaseAuthentication;
