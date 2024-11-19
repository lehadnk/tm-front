export class User {
    id: number
    name: string
    email: string
    password: string
    role: string

    constructor(id: number, name: string, email: string, password: string, role: string) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.role = role
    }
}

export class UserListResponse {
    users: User[]
    count: number

    constructor(users: User[], count: number) {
        this.users = users
        this.count = count
    }
}