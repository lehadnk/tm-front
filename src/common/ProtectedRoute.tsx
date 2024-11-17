import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {isAuthenticated} from "../requests/TokenStorage.ts";

interface ProtectedRouteProps {
    children: JSX.Element; // The component to render if authenticated
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};