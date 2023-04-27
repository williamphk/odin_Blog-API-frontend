import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    const response = await fetch(
      "https://blog-api-application.azurewebsites.net/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);

      // Store the JWT token and User object in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.userResponse);

      // Fetch the user data from localStorage
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        // If the user data is available, and set it to the currentUser state
        setCurrentUser(storedUser);
      }

      // Perform any necessary actions upon successful login
    } else {
      console.log("Login failed");
    }
  };

  const logout = () => {
    console.log("Logout successful");

    // Remove the JWT token in localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    //Set the current user to null
    setCurrentUser(null);
  };

  //After each mount of the AuthContext component
  useEffect(() => {
    // Fetch the user data from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // If the user data is available, and set it to the currentUser state
      setCurrentUser(storedUser);
    }
    // Set isLoading to false after initializing the currentUser state
    setIsLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
