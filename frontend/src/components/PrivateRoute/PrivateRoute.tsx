import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/AuthUtils";


const PrivateRoute = () => {
    if(!isAuthenticated()) return <Navigate to={'/login'}/>;
    return <Outlet/>
};

export default PrivateRoute;