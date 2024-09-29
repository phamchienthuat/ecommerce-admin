import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const isLoggedIn = window.localStorage.getItem('isLoggedIn')
    return isLoggedIn === "true" ? <Outlet/> : <Navigate to="/auth/signin"/>;
};

export default ProtectedRoute;