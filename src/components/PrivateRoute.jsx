import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");

  // If user never logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise allow access — even if expired, axios will refresh it
  return children;
}

export default PrivateRoute;
