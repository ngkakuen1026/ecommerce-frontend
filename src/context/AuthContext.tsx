import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { userAPI, authAPI } from "../services/http-api";
import authAxios from "../services/authAxios";

type AuthContextType = {
  isLoggedIn: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  checkAuth: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await authAxios.get(`${userAPI.url}/me`, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
      console.log("Logged in user:", res.data);
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Not logged in", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${authAPI.url}/logout`, null, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);