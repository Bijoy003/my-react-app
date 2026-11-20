import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth-context";

// Renders the page for signed-in users; everyone else is redirected with
// the attempted location remembered, so sign-in can send them back.
export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user)
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  return children;
}
