import Firebase, { db } from "./firebase_init";

export async function uploadImage(blob: Blob, photoId: string): Promise<any> {
  const storageRef = Firebase.storage().ref();
  return await storageRef
    .child(`uploads/${photoId}.jpg`)
    .put(blob, { contentType: "image/jpeg" });
}

export async function deleteImage(photoId: string): Promise<any> {
  const storageRef = Firebase.storage().ref();
  storageRef.child(`uploads/${photoId}.jpg`).delete();
}

export function signInAnonymously(): Promise<any> {
  return Firebase.auth().signInAnonymously();
}

export async function saveUserCorrectSelection(
  landmarkDescription: string,
  userUid: string
): Promise<any> {
  await db
    .collection("landmarks")
    .doc(landmarkDescription)
    .collection("correct_answers")
    .add({ userUid });
}

export async function saveUserIncorrectSelection(
  landmarkDescription: string,
  userUid: string
): Promise<any> {
  await db
    .collection("landmarks")
    .doc(landmarkDescription)
    .collection("incorrect_answers")
    .add({ userUid });
}
