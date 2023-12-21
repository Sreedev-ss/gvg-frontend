import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    let location = useLocation();
    const isAuthenticated = localStorage.getItem("loginData");
    if (!isAuthenticated) {
        return <Navigate to="/authentication/login" state={{ from: location }} replace />
    }
    return children
}

export default ProtectedRoute