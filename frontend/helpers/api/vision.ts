import { http } from "../http";
export const vision = {
  validateLandmark,
};
const URL =
  "https://us-central1-landmark-e738f.cloudfunctions.net/validateLandmark"; //"http://localhost:5001/landmark-e738f/us-central1/validateLandmark";
async function validateLandmark(): Promise<any> {
  return await http.get(`${URL}`);
}
