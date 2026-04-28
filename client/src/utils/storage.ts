import cookies from 'universal-cookie';

const cookie = new cookies();

export function get(key: string){
    return cookie.get(key);
}

export function set(key: string, value: string | number){
    cookie.set(key, value, { 
        path: '/' 
    });
}

export function remove(key: string){
    cookie.remove(key);
}