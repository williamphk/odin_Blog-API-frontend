import React from "react";
import { useAuth } from "./contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to="/odin_Blog-API-frontend/login" />
  );
};
