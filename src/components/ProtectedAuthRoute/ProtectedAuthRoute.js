import React, {useContext} from "react";
import {Navigate} from "react-router-dom";
import { LoggedInContext } from '../../context/LoggedInContext';

const ProtectedAuthRouteElement = ({ element }) => {
  const { loggedIn, loading } = useContext(LoggedInContext);
  return loading ? null : !loggedIn ? element : <Navigate to="/profile" replace />;
}

export default ProtectedAuthRouteElement;