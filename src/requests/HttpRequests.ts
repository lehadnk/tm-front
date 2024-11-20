import {CurrentUserResponse} from "./responses/CurrentUserResponse.ts";
import {UnauthenticatedException} from "./exceptions/UnauthenticatedException.ts";
import {LoginResponse} from "./responses/LoginResponse.ts";
import {getToken} from "./TokenStorage.ts";
import {TorrentListResponse} from "./responses/TorrentListResponse.ts";
import {User, UserListResponse} from "./responses/UserListResponse.ts";

export async function usersCurrent(): Promise<CurrentUserResponse> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/current', {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }

    return await response.json() as CurrentUserResponse
}

export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })

    return await response.json() as LoginResponse
}

export async function torrentsList(page: number, limit: number): Promise<TorrentListResponse>
{
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: "id"
    });

    const url = `${import.meta.env.VITE_BACKEND_URL}/torrents?${queryParams.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }

    return await response.json() as TorrentListResponse
}

export async function addTorrent(file: any): Promise<void>
{
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/torrents', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + getToken()
        },
    });

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }
}

export async function deleteTorrent(id: number): Promise<void> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/torrents/' + id.toString(), {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }
}

export async function usersList(page: number, limit: number): Promise<UserListResponse>
{
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: "id"
    });

    const url = `${import.meta.env.VITE_BACKEND_URL}/users?${queryParams.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }

    return await response.json() as UserListResponse
}

export async function getUser(id: number): Promise<User> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/' + id.toString(), {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }

    return await response.json() as User
}

export async function createUser(name: string, email: string, password: string, role: string): Promise<void> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
        body: JSON.stringify({name, email, password, role})
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }
}

export async function editUser(id: number, name: string, email: string, password: string, role: string): Promise<void> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/' + id.toString(), {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
        body: JSON.stringify({name, email, password, role})
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }
}

export async function deleteUser(id: number): Promise<void> {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/' + id.toString(), {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken()},
    })

    if (response.status === 401) {
        throw new UnauthenticatedException()
    }
}