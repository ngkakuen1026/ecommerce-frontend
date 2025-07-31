import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ isAdminRequired = false }) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (isAdminRequired && !user?.is_admin) {
    console.log("Redirecting to home, user is not admin:", user);
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;