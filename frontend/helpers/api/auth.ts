import { http } from "../http";
export const auth = {
  signIn,
  signUp,
};

const URL = "https://mathiaspractice.azurewebsites.net/api/auth";
async function signIn(email: string, password: string): Promise<string> {
  return await http.post(`${URL}/sign-in`, { email, password });
}

async function signUp(email: string, password: string): Promise<string> {
  return await http.post(`${URL}/sign-up`, { email, password });
}
