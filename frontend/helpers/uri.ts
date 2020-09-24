import * as FileSystem from "expo-file-system";

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

export const uriToBase64 = async (photoUri: string) => {
  return await FileSystem.readAsStringAsync(photoUri, { encoding: "base64" });
};
