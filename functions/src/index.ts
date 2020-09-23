import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// const serviceAccount = require("../../keys/landmark_key.json");
/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://landmark-e738f.firebaseio.com",
});
*/

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.validateLandmark = functions.https.onRequest(async (req, res) => {
  const vision = require("@google-cloud/vision");
  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  try {
    // Performs label detection on the image file
    const bucketName = "landmark-e738f.appspot.com/uploads";
    const fileName = "photo.jpg";
    const [result] = await client.landmarkDetection(
      `gs://${bucketName}/${fileName}`
    );
    const landmarks = result.landmarkAnnotations;
    console.log("Landmarks:");
    landmarks.forEach((landmark: any) => console.log(landmark));
    res.send(landmarks);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
