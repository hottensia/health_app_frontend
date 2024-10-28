import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      isAuthenticated: !!user,
      user: user || {},
      userId: user ? user.id : null,
      loading: false,
      error: null,
    };
  });

  const navigate = useNavigate();

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
