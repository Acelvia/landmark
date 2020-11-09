import * as functions from "firebase-functions";
import vision from "@google-cloud/vision";

exports.validateLandmark = functions.https.onRequest(async (req, res) => {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  try {
    console.log(req.body);
    // Performs label detection on the image file
    const projectId = "landmark-bff66";
    const bucketName = `${projectId}.appspot.com/uploads`;
    const fileName = `${req.body.photoId}`;
    const [result] = await client.landmarkDetection(
      `gs://${bucketName}/${fileName}`
    );
    const landmarks = result.landmarkAnnotations || [];
    console.log("Landmarks:");
    landmarks.forEach((landmark) => console.log(landmark));
    res.send(landmarks);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});
