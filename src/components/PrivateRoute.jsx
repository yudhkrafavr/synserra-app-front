import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_BASE_URL = "http://localhost:8084";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  // Case 1: No token at all
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    // 🧠 If token expired — try refresh first instead of redirecting immediately
    if (isExpired) {
      console.warn("Token expired — attempting refresh...");
      return <TokenRefresher refreshToken={refreshToken}>{children}</TokenRefresher>;
    }
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return <Navigate to="/login" replace />;
  }

  // Token valid — allow access
  return children;
}

// 🧩 Small helper component to handle refresh asynchronously
function TokenRefresher({ refreshToken, children }) {
  const [status, setStatus] = React.useState("loading"); // "loading" | "success" | "failed"

  React.useEffect(() => {
    const tryRefresh = async () => {
      if (!refreshToken) {
        setStatus("failed");
        return;
      }

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = res.data.access_token || res.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem("access_token", newAccessToken);
          console.info("Token refreshed successfully ✅");
          setStatus("success");
        } else {
          console.error("No new access token returned");
          setStatus("failed");
        }
      } catch (error) {
        console.error("Token refresh failed ❌:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setStatus("failed");
      }
    };

    tryRefresh();
  }, [refreshToken]);

  if (status === "loading") {
    return <div className="flex justify-center py-10">Refreshing session...</div>;
  }

  if (status === "failed") {
    return <Navigate to="/login" replace />;
  }

  // Once refreshed → render protected content
  return children;
}

export default PrivateRoute;
