import axios from 'axios';
import { useAuthStore } from '../states/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
})

api.interceptors.request.use((config) => {
    const { isAuthenticated, accessToken } = useAuthStore.getState();

    if (isAuthenticated && accessToken) {
        config.headers = config.headers || {};

        Object.assign(config.headers as any, {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
    }

    return config;
})

export default api