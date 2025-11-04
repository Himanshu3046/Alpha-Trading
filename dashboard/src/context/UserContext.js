import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const UserContext = createContext();

// Custom hook to use user context easily
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from URL or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");

    if (userParam) {
      const decodedUser = JSON.parse(decodeURIComponent(userParam));
      setUser(decodedUser);
      localStorage.setItem("dashboardUser", JSON.stringify(decodedUser));
    } else {
      const savedUser = localStorage.getItem("dashboardUser");
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
