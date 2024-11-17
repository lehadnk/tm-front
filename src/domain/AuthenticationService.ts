import {login, usersCurrent} from "../requests/HttpRequests.ts";
import {MeResponse} from "../requests/responses/MeResponse.ts";
import {UnauthenticatedException} from "../requests/exceptions/UnauthenticatedException.ts";
import {setToken} from "../requests/TokenStorage.ts";

export async function authenticate(email: string, password: string): Promise<MeResponse> {
    const loginResponse = await login(email, password)
    if (!loginResponse.isSuccess || loginResponse.authenticationToken == undefined) {
        throw new UnauthenticatedException()
    }

    setToken(loginResponse.authenticationToken);

    return await usersCurrent();
}