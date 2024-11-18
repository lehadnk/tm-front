import {login, usersCurrent} from "../requests/HttpRequests.ts";
import {CurrentUserResponse} from "../requests/responses/CurrentUserResponse.ts";
import {UnauthenticatedException} from "../requests/exceptions/UnauthenticatedException.ts";
import {deleteToken, setToken} from "../requests/TokenStorage.ts";

export async function authenticate(email: string, password: string): Promise<CurrentUserResponse> {
    const loginResponse = await login(email, password)
    if (!loginResponse.isSuccess || loginResponse.authenticationToken == undefined) {
        throw new UnauthenticatedException()
    }

    setToken(loginResponse.authenticationToken);

    return await usersCurrent();
}

export async function getCurrentUser(): Promise<CurrentUserResponse | null> {
    try {
        return await usersCurrent()
    }
    catch(err) {
        deleteToken()
        console.log(err)
        return null
    }
}