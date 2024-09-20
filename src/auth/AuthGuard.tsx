import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn && window.location.pathname !== '/register' && window.location.pathname !== '/home') {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;
