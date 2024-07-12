import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Loading from "../Component/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }
  return (
    <Navigate state={{ redirectTo: location.pathname }} to="/"></Navigate>
  );
};

export default PrivateRoute;
