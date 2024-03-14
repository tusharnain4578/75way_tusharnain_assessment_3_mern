import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CustomerProtectedRoute = ({ element }: { element: React.ReactNode }) => {

    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
    const user = useSelector((state: any) => state.auth.user);

    // 1 is role for customer
    if (!isLoggedIn || !user || user.role !== 1) {
        return <Navigate to="/auth/login" />;
    }

    return element;
}

export default CustomerProtectedRoute;