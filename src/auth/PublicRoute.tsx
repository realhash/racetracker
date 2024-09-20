import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return !isLoggedIn ? element : <Navigate to="/home" />;
};

export default PublicRoute;
