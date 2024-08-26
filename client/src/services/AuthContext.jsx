// AuthContext.js
import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import connexion from "./connexion";

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

  const handleEventStatus = useCallback(
    async (eventId, newStatus) => {
      try {
        const existingSave = await connexion.get(
          `api/eventSave/${user.id}/${eventId}`
        );

        if (existingSave.data.status === newStatus) {
          const deleteSave = await connexion.delete(
            `api/eventSave/${user.id}/${eventId}`
          );
          return deleteSave;
        }

        const updateSave = await connexion.put(
          `api/eventSave/${user.id}/${eventId}`,
          {
            status: newStatus,
          }
        );
        return updateSave;
      } catch (err) {
        if (err.status === 404) {
          const newSave = await connexion.post(`api/eventSave/`, {
            user_id: user.id,
            event_id: eventId,
            status: newStatus,
          });
          return newSave;
        }
        throw new Error(err);
      }
    },
    [user]
  );

  const login = async (email, password) => {
    try {
      const response = await connexion.post("api/user/login", {
        email,
        password,
      });

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
      handleEventStatus,
      error,
    }),
    [user, error, handleEventStatus]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
