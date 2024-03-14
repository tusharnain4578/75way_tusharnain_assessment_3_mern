import axios from "axios";
import { ApiBaseUrl } from "./main";

const axiosInstance = axios.create({
    baseURL: ApiBaseUrl,
    withCredentials: true
});

export default axiosInstance;