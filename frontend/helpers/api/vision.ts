import { projectId } from "../firebase_init";

interface IEntityAnnotation {
  mid?: string | null;
  locale?: string | null;
  description?: string;
  score?: number | null;
  confidence?: number | null;
  topicality?: number | null;
}
export async function validateLandmark(
  photoId: string
): Promise<string | undefined> {
  const URL = `https://us-central1-${projectId}.cloudfunctions.net/validateLandmark`;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photoId }),
  };
  const landmarks: IEntityAnnotation[] = await (
    await fetch(`${URL}`, requestOptions)
  ).json();
  if (landmarks.length !== 0) {
    return landmarks[0].description;
  }
  return;
}
