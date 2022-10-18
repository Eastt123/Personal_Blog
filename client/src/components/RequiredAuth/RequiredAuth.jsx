import React from 'react';
import { getLogInStatus, getLoading } from '../../features/blogsSlice';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequiredAuth = () => {
    const logInStatus = useSelector(getLogInStatus);
    const location = useLocation();
    const isLoading = useSelector(getLoading);
    if(isLoading){
        return <div>
            <h1>LOADING...</h1>
        </div>
    }
    return (
        logInStatus > 0 ?  <Outlet /> : <Navigate 
       to="/login" state={{ from: location }} replace
       />
    
    );
};

export default RequiredAuth;