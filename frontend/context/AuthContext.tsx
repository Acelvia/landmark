import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
});
