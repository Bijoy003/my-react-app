import { createContext, useContext } from "react";

// Context and hook live apart from the provider so component files export
// only components (the react-refresh rule).
export const AuthContext = createContext(null);

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used inside <AuthProvider>");
  return auth;
}
