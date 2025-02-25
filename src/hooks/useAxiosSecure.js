import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                    console.log("Unauthorized request. Redirecting to login page...");
                    signOutUser();
                    navigate('/login')

                }
                return Promise.reject(error);
            }
        );
    }, [])

    return axiosInstance;
};

export default useAxiosSecure;