import React, { createContext, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.getCurrentUser());

  const setAuthentication = (userData) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
