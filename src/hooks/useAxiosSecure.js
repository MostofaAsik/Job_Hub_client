import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    return axiosInstance;
};

export default useAxiosSecure;