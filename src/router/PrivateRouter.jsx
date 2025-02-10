import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location)

    if (loading) {
        return <span className="loading loading-ring loading-lg"></span>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={location?.pathname}></Navigate>
};

export default PrivateRouter;