import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token); // ✅ Works now
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      console.warn("Token expired, redirecting to login...");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
