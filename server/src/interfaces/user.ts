export interface UserAuthRequest {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "user";
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface AuthenticatedUser{
    _id: string,
    name: string,
    email: string,
    role: "admin" | "user"
}