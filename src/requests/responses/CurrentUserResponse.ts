export class CurrentUserResponse {
    public name: string
    public email: string
    public role: string

    constructor(name: string, email:string , role: string)
    {
        this.name = name
        this.email = email
        this.role = role
    }
}