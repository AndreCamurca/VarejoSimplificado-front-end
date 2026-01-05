import api from './api';

interface LoginResponse {
    access_token: string;
    token_type: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', { 
        email, 
        password
    });

    if (response.status !== 200)
        throw new Error('Erro ao fazer login');

    return response.data;
}

