import Firebase from "./firebase_init";

export const uploadImage = (blob: any, photoId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    var storageRef = Firebase.storage().ref();

    storageRef
      .child(`uploads/${photoId}.jpg`)
      .put(blob, {
        contentType: "image/jpeg",
      })
      .then((snapshot) => {
        blob.close();

        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteImage = (photoId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    var storageRef = Firebase.storage().ref();
    storageRef
      .child(`uploads/${photoId}.jpg`)
      .delete()
      .then(() => resolve())
      .catch((error) => {
        reject(error);
      });
  });
};

export const signInAnonymously = (): void => {
  Firebase.auth()
    .signInAnonymously()
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
    });
};
