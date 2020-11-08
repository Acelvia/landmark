import { projectId } from "../firebase_init";

export async function validateLandmark(photoId: string): Promise<any[]> {
  const URL = `https://us-central1-${projectId}.cloudfunctions.net/validateLandmark`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photoId }),
  };
  return await (await fetch(`${URL}`, requestOptions)).json();
}
