export class LoginResponse {
    public isSuccess: boolean
    public authenticationToken?: string

    constructor(isSuccess: boolean, authenticationToken?: string) {
        this.isSuccess = isSuccess
        this.authenticationToken = authenticationToken
    }
}