export function getToken() {
    return localStorage.getItem('authToken')
}

export function setToken(token: string)
{
    localStorage.setItem('authToken', token)
}

export function isAuthenticated() {
    return !!localStorage.getItem('authToken')
}

export function deleteToken() {
    localStorage.removeItem('authToken')
}