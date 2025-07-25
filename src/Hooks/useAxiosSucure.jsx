import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
})

const useAxiosSucure = () => {

    axiosInstance.interceptors.request.use( (config)=> {
        return config;
    },  (error)=> {
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default useAxiosSucure;