import axios from 'axios';

import { useAuthStore } from '../states/auth';
import { removeTokenSessionStorage } from '../utils/token';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
})

api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
        config.headers = config.headers || {};

        Object.assign(config.headers as any, {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
    }

    return config;
})

api.interceptors.response.use((response) => {
    return response;
}, (error) => {

    if (error.response.status === 401) {
        removeTokenSessionStorage();
    }

    return Promise.reject(error);
});

export default api