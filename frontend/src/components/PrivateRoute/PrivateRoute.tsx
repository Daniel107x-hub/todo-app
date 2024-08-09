import { useSelector } from "react-redux";
import { checkAuth } from "../../redux/Auth/AuthSlice";
import { Navigate, Outlet, redirect, Route } from "react-router-dom";


const PrivateRoute = () => {
    const isAuthenticated = useSelector(checkAuth);
    if(!isAuthenticated) return <Navigate to={'/login'}/>;
    return <Outlet/>
};

export default PrivateRoute;