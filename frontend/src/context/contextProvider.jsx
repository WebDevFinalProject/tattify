import React, { useEffect, useState } from "react";
import { createContext } from "react";
import api from "../components/api";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userCheck = async () => {
      try {
        const response = await api.get("/api/profile", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
        setError(
          "Failed to fetch user profile. Please refresh or log in again."
        );
      } finally {
        setLoading(false);
      }
    };
    userCheck();
  }, []);

  //LOGIN
  const login = (user) => setUser(user);

  //LOGOUT

  const logout = async () => {
    try {
      await api.post("/api/user-logout");
      setUser(null);
    } catch (error) {
      setError("An error occurred while logging out. Please try again.");
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        isOpen,
        setIsOpen,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
