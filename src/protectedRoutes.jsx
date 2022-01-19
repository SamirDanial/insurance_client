import React from 'react'
import { Outlet } from 'react-router-dom';
import Login from './components/auth/Login';

const useAuth = (isAuth) => {
    const user = {loggedIn: isAuth}
    return user && user.loggedIn;
}

const ProtectedRoutes = ({isAuthen}) => {
    const isAuth = useAuth(isAuthen);
    return isAuth ? <Outlet /> : <Login />
}

export default ProtectedRoutes
