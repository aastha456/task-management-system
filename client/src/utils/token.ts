import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/storage';
import * as storage from './storage';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    userId: string;
    email: string;
    role?: string;
    exp: number;
}

export const setAccessToken = (token: string) => {
    storage.set(ACCESS_TOKEN, token);
};

export const setRefreshToken = (token: string) => {
    storage.set(REFRESH_TOKEN, token);
};

export const getRefreshToken = () : string | null => {
    return storage.get(REFRESH_TOKEN);
};

export const getAccessToken = () : string | null => {
    return storage.get(ACCESS_TOKEN);
};

export const clearTokens = () => {
    storage.remove(ACCESS_TOKEN);
    storage.remove(REFRESH_TOKEN);
};

export const getDecodedToken = (token: string): DecodedToken => {
    return jwtDecode(token);
;} 
