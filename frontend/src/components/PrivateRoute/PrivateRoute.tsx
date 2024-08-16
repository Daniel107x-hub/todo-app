import { Navigate, Outlet } from "react-router-dom";
import {useSelector} from "react-redux";
import {removeTokenFromLocalStorage} from "../../utils/LocalStorageUtils";


const PrivateRoute = () => {
    const user = useSelector((state: any) => {
        return state.auth.user
    });
    if(!user){
        removeTokenFromLocalStorage(); // Ban token in the backend
        return <Navigate to={'/login'}/>;
    }
    return <Outlet/>
};

export default PrivateRoute;