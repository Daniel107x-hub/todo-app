import { Navigate, Outlet } from "react-router-dom";
import { getTokenFromLocalStorage } from "../../utils/LocalStorageUtils";


const PrivateRoute = () => {
    const isAuthenticated = !!getTokenFromLocalStorage();
    if(!isAuthenticated) return <Navigate to={'/login'}/>;
    return <Outlet/>
};

export default PrivateRoute;