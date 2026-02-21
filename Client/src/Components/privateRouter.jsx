import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContexts.jsx";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // If no user, redirect to QR code page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
