import { Outlet, Navigate } from "react-router-dom";

function ConnectedLayout() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/connexion" />;
  }
  return <Outlet />;
}

export default ConnectedLayout;
