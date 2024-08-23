import {Navigate, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useGetUserQuery} from "../../redux/Auth/AuthApi";
import {useEffect, useState} from "react";
import Loader from "../Common/Loader";
import {removeTokenFromLocalStorage} from "../../utils/LocalStorageUtils";
import {setUser} from "../../redux/Auth/AuthSlice";


const PrivateRoute = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {isLoading: isQueryLoading, data, refetch} = useGetUserQuery();

    useEffect(() => {
        if(isQueryLoading) setIsLoading(true);
        if(data){
            dispatch(setUser(data));
            setIsLoading(false);
        }
    }, [data, isQueryLoading]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const user = useSelector((state: any) => {
        return state.auth.user
    });

    if(!user){
        removeTokenFromLocalStorage(); // Ban token in the backend
        return <Navigate to={'/login'}/>;
    }
    if(isLoading) return <Loader/>;
    return <Outlet/>
};

export default PrivateRoute;