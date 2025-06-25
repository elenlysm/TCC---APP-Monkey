import axios from 'axios';
import Constants from 'expo-constants';
import { getToken } from '@services/tokenService';

const api = axios.create({
    baseURL: Constants.expoConfig?.extra?.ADMIN_API_BASE_URL || 'http://192.168.0.114:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        if (!config.headers.Authorization) {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
