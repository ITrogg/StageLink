// AuthContext.js
import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import axios from "./connexion";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch {
        localStorage.removeItem("authToken"); // Nettoie le token invalide
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("api/user/login", { email, password });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
        return true;
      }
      setError(" grefErreur de connexion. Veuillez réessayer");
      return false;
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      error,
    }),
    [user, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
