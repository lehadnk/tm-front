export class CurrentUserResponse {
    public name: string
    public email: string
    public type: string

    constructor(name: string, email:string , type: string)
    {
        this.name = name
        this.email = email
        this.type = type
    }
}