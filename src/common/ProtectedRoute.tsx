import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {isAuthenticated} from "../requests/TokenStorage.ts";

interface ProtectedRouteProps {
    children: JSX.Element;
    role: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};