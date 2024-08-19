import axios from "axios";
import {API_BASE_PATH} from "../constants/constants";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5299' + API_BASE_PATH
});
export default axiosInstance;