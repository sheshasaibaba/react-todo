import ky from 'ky'
import { useAuthStore } from '@/store/authStore'

export const api = ky.create({
    prefixUrl: 'http://localhost:5000/api/',
    timeout: 30000,
    retry: { limit: 2 },

    hooks: {
        beforeRequest: [
            (request) => {
                const { token } = useAuthStore.getState()
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`)
                }
            },
        ],
        afterResponse: [
            async (_request, _options, response) => {
                if (response.status === 401) {
                    useAuthStore.setState({
                        user: null,
                        token: null,
                        isAuthenticated: false,
                    })
                    window.location.href = '/login'
                }
                return response
            },
        ],
    },
})