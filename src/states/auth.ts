import { create } from 'zustand'


interface AuthStateType {
    isAuthenticated: boolean;
    accessToken: string;

    setAuthenticated: (value: boolean) => void;
    setAccessToken: (token: string) => void;
}


export const useAuthStore = create<AuthStateType>((set) => ({
    isAuthenticated: false,
    accessToken: '',

    setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
    setAccessToken: (token: string) => set({ accessToken: token }),
}))

