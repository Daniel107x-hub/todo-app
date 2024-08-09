import axios from "axios";
import { removeTokenFromLocalStorage } from "../utils/LocalStorageUtils";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5299/api'
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401) {
            removeTokenFromLocalStorage();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;