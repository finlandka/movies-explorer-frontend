import React from "react";
import { LoggedInContext } from '../../context/LoggedInContext';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {
  const loggedIn = React.useContext(LoggedInContext);
  return loggedIn ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRouteElement;