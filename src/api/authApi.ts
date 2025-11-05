import { api } from "@/api/client";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    data : {
    id: string;
    email: string;
    name: string;
    token: string;
    }
    
}

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
    return api.post("auth/login", { json: payload }).json();
}

export async function signupApi(payload: SignupPayload): Promise<AuthResponse> {
    return api.post("auth/register", { json: payload }).json();
}
