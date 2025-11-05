import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore'
import { loginApi, signupApi, type LoginPayload, type SignupPayload , type AuthResponse} from '../api/authApi'

export function useLoginMutation() {
    const queryClient = useQueryClient()
    const login = useAuthStore((state) => state.login)

    return useMutation({
        mutationFn: (payload: LoginPayload) => loginApi(payload),
        onSuccess: (data:AuthResponse) => {
            const userData = data.data
            login({ name: userData.name, email: userData.email }, userData.token)
            queryClient.setQueryData(['user', 'current'], userData)
        },
    })
}

export function useSignupMutation() {
    const queryClient = useQueryClient()
    const login = useAuthStore((state) => state.login)

    return useMutation({
        mutationFn: (payload: SignupPayload) => signupApi(payload),
        onSuccess: (data:AuthResponse) => {
            const userData = data.data
            login({ name: userData.name, email: userData.email }, userData.token)
            queryClient.setQueryData(['user', 'current'], userData)
        },
    })
}