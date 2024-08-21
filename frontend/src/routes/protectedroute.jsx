import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); //check if user is logged in

  // go to login page if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // go to desired page if logged in
  return children;
};

export default ProtectedRoute;
