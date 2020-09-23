import Firebase from "../../helpers/firebase";

export const uriToBlob = (uri: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      // return the blob
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      // something went wrong
      reject(new Error("uriToBlob failed"));
    };

    // this helps us get a blob
    xhr.responseType = "blob";

    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const uploadToFirebase = (blob: any, photoId: string): Promise<any> => {
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
