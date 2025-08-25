import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {
  const { User, SignOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (User?.accessToken) {
          config.headers.Authorization = `Bearer ${User.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if (status === 403) {
          navigate("/forbidden");
        } else if (status === 401) {
          SignOut()
            .then(() => navigate("/login"))
            .catch(() => {});
        }
        return Promise.reject(error);
      }
    );

    // Clean up on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [User?.accessToken, SignOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
