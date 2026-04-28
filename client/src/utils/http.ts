import axios from 'axios'
import { config } from '../config'
import { getAccessToken } from './token'

const http = axios.create({
    baseURL: config.apiBaseURI,
    headers: {
        'Content-Type': 'application/json', 
        'Cache-Control': 'no-cache'
    }
})

http.interceptors.request.use((config) => {
    if(config.headers){
        config.headers.Authorization = `Bearer ${getAccessToken()}`
    }
    return config;
});

export default http