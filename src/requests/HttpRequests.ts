import {MeResponse} from "./responses/MeResponse.ts";
import {UnauthenticatedException} from "./exceptions/UnauthenticatedException.ts";
import {LoginResponse} from "./responses/LoginResponse.ts";
import {getToken} from "./TokenStorage.ts";

export async function usersCurrent(): Promise<MeResponse> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/current', {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }

    return await response.json() as MeResponse
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })

    return await response.json() as LoginResponse
}