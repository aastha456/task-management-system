export interface UserAuthRequest {
    name: string;
    email: string;
    password: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface AuthenticatedUser{
    _id: string,
    name: string,
    email: string
}