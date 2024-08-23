import axios from "axios";
import {API_BASE_PATH} from "../constants/constants";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:3001' + API_BASE_PATH
});
export default axiosInstance;