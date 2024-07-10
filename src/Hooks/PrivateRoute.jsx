import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
        <div className="container mx-auto mt-10 text-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return (
    <Navigate
      state={{ redirectTo: location.pathname }}
      to="/login"
    ></Navigate>
  );
};

export default PrivateRoute;
