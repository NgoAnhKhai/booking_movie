import React, { createContext, useState, useContext, useEffect } from "react";
import apiService from "../api/apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error("Error parsing user data:", err);
        return null;
      }
    }
    return null;
  });

  // Đăng ký tài khoản
  const signup = async (email, full_name, password) => {
    try {
      const response = await apiService.post(
        "/api/method/cinema.api.auth.register",
        {
          email,
          full_name,
          password,
        }
      );
      return response;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // Đăng nhập
  const signin = async (email, password) => {
    try {
      const response = await apiService.post(
        "/api/method/cinema.api.auth.login",
        {
          usr: email,
          pwd: password,
        }
      );

      const sid = response.data?.sid;
      const user = response.data?.user;

      if (!sid) throw new Error("sid không tồn tại");
      if (!user) throw new Error("User info not returned from server!");

      setUser(user);
      localStorage.setItem("sid", sid);
      localStorage.setItem("roles", JSON.stringify(user.roles || []));
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Đăng xuất
  const signout = () => {
    setUser(null);
    localStorage.removeItem("sid");
    localStorage.removeItem("roles");
    localStorage.removeItem("user");
    window.location.href = "/auth/signin";
  };

  const isAuthenticated = () => {
    const sid = localStorage.getItem("sid");
    const storedUser = localStorage.getItem("user");
    return !!(sid && storedUser);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
        signout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, signout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
