import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DriverProtectedRoute = ({ element }: { element: React.ReactNode }) => {

    const isLoggedIn = useSelector((state: any) => state?.auth?.isLoggedIn ?? false);
    const user = useSelector((state: any) => state.auth?.user ?? null);

    // 2 is role for driver
    if (!isLoggedIn || !user || user.role !== 2) {
        return <Navigate to="/auth/login" />;
    }

    return element;
}

export default DriverProtectedRoute;