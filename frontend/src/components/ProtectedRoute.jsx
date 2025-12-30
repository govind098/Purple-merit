import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole = null }) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole) {
        const userData = JSON.parse(user);
        if (userData.role !== requiredRole) {
            return <Navigate to="/profile" />;
        }
    }

    return children;
}
