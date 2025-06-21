import axios from 'axios';

const api = axios.create({
    baseURL:'http://192.168.56.1:8081',
    timeout: 5000,
    headers:{
        'Content-Type': 'aplication/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = '';
        if (token){
            config.headers.Authorization = 'Bearer ${token}';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;