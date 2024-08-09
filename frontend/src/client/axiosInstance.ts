import axios from "axios";
import { redirect } from "react-router-dom";
import { removeTokenFromLocalStorage } from "../utils/LocalStorageUtils";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5299/api'
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401) {
            removeTokenFromLocalStorage();
            return redirect('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;