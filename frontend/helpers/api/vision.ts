import { projectId } from "../firebase_init";

interface IEntityAnnotation {
  mid?: string | null;
  locale?: string | null;
  description?: string | null;
  score?: number | null;
  confidence?: number | null;
  topicality?: number | null;
}
export async function validateLandmark(
  photoId: string
): Promise<IEntityAnnotation[]> {
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
