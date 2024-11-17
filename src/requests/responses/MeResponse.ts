export class MeResponse {
    public email: string
    public type: string

    constructor(email:string , type: string)
    {
        this.email = email
        this.type = type
    }
}