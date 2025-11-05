import { useLoginMutation, useSignupMutation } from "./authMutation";

export function useAuthActions() {
    const login = useLoginMutation();
    const signup = useSignupMutation();

    return {
        login: login.mutate,
        loginAsync: login.mutateAsync,
        loginLoading: login.isPending,
        loginError: login.error,

        signup: signup.mutate,
        signupAsync: signup.mutateAsync,
        signupLoading: signup.isPending,
        signupError: signup.error,
    };
}
