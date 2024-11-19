import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {isAuthenticated} from "../requests/TokenStorage.ts";

interface ProtectedRouteProps {
    children: JSX.Element;
    role: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const location = useLocation();

    console.log(role)
    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};