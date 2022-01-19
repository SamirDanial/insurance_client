import React from 'react'
import { Outlet } from 'react-router-dom';
import Home from './components/home/Home';

const useAdmin = (isAdmin) => {
    const user = {isAdmin}
    return user && user.isAdmin;
}

const AdminRoutes = ({isAdminMan}) => {
    const isAdmin = useAdmin(isAdminMan);
    return isAdmin ? <Outlet /> : <Home />
}

export default AdminRoutes
