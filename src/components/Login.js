import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      // Perform any necessary actions upon successful login, e.g., redirect to another page
      setRedirectToHome(true);
    } catch (error) {
      console.log("Login failed", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {redirectToHome && <Navigate replace to="/" />}
      <h2>Login</h2>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
