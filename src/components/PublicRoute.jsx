import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    // ✅ If already logged in, redirect away from login/signup
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
