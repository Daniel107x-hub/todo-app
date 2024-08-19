import {useDispatch} from "react-redux";
import {LOGIN_PATH, UNAUTHORIZED_CODE} from "../constants/constants";
import {removeTokenFromLocalStorage} from "../utils/LocalStorageUtils";
import axiosInstance from "./axiosInstance";
import {removeUser} from "../redux/Auth/AuthSlice";

const useAxiosInterceptor = () => {
    const dispatch = useDispatch();

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if(error.response && error.response.status === UNAUTHORIZED_CODE) {
                removeTokenFromLocalStorage();
                dispatch(removeUser());
                window.location.href = LOGIN_PATH;
            }
            return Promise.reject(error);
        }
    );

    return null;
}

export default useAxiosInterceptor;