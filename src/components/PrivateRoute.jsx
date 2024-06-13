import authService from "../services/authService";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const isAuthenticated = authService.getCurrentUser();

  return isAuthenticated ? element : <Navigate to={"/login"} />;
}
