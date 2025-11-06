import { create } from 'zustand';
import { persist,type PersistOptions } from 'zustand/middleware';

type User = {
    name: string;
    email: string;
    id?: string;
}
interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

interface AuthActions {
    login: (userData: User, tokenData: string) => void;
    logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const persistOptions: PersistOptions<AuthStore> = {
    name: 'auth-storage',
};

export const useAuthStore = create<AuthStore>()(
    persist(
    (set) => ({
    isAuthenticated : false,
    user : null,
    token : null,

    login: (userData,tokenData) => set({
        isAuthenticated: true,
        user: userData,
        token: tokenData,
    }),

    logout: () => set({
        isAuthenticated: false,
        user: null,
        token: null,
    }),
}), 
persistOptions
)
)