import axios from 'axios';
import { getToken } from '../../src/services/tokenService';

const api = axios.create({
    baseURL: 'http://192.168.56.1:8081',  
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
