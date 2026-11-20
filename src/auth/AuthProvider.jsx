import { useState } from "react";
import { AuthContext } from "./auth-context";

// Pretend auth for the lab: no server, no secrets, no persistence. A real
// app would verify credentials server-side and keep a session, not a name.
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = {
    user,
    signIn: (name) => setUser({ name }),
    signOut: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
