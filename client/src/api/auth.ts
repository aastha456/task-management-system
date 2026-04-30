import type { LoginForm } from "../pages/Login";
import type { RegisterForm } from "../pages/Register";
import http from "../utils/http";

export const login = async (data: LoginForm) => {
    return http.post("/auth/login", data);
}

export const register = async (data: RegisterForm) => {
    return http.post("/auth/register", data);
}

export interface LogoutData {
    refreshToken: string;
}

export const logout = async (data: LogoutData) => {
    return http.post("/auth/logout", data);
}