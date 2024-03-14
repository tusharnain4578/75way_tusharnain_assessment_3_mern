import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = (): React.JSX.Element => {


    return (
        <div >
            <Outlet />
        </div>
    );
};

export default AuthLayout;
