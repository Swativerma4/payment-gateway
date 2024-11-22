import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('user');

  // Check if token is not present, then redirect to home page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the children (protected content)
  return children;
};

export default ProtectedRoute;
