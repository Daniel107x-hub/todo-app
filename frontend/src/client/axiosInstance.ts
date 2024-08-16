import axios from "axios";
import { removeTokenFromLocalStorage } from "../utils/LocalStorageUtils";
import {API_BASE_PATH, LOGIN_PATH, UNAUTHORIZED_CODE} from "../constants/constants";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5299' + API_BASE_PATH
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === UNAUTHORIZED_CODE) {
            removeTokenFromLocalStorage();
            window.location.href = LOGIN_PATH;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;