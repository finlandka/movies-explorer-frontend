import React from "react";
import { LoggedInContext } from '../../context/LoggedInContext';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {
  const { loggedIn, loading } = React.useContext(LoggedInContext);
  return loading ? null : loggedIn ? element : <Navigate to="/" replace />;
};

export default ProtectedRouteElement;