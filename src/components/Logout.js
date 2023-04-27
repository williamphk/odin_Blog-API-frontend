import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

const Login = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const { logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    logout();
    // Perform any necessary actions upon successful login, e.g., redirect to another page
    setRedirectToHome(true);
  };

  return (
    <>{redirectToHome && <Navigate replace to="/odin_Blog-API-frontend/" />}</>
  );
};

export default Login;
