import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/storage';
import * as storage from './storage';

export function getRefreshToken(): string {
    return storage.get(REFRESH_TOKEN)

}

export function getAccessToken(): string {
    return storage.get(ACCESS_TOKEN)
}
