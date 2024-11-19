import {User, UserListResponse} from "../requests/responses/UserListResponse.ts";
import {createUser, editUser, usersList, deleteUser as deleteUserHttp, getUser} from "../requests/HttpRequests.ts";

export async function getUserList(page: number, limit: number): Promise<UserListResponse>
{
    return await usersList(page, limit);
}

export async function getUserById(id: number): Promise<User>
{
    return await getUser(id)
}

export async function saveUser(email: string, password: string, role: string, id?: number): Promise<void> {
    if (id == undefined) {
        return await createUser(email, password, role);
    }

    return await editUser(id, email, password, role);
}

export async function deleteUser(id: number): Promise<void> {
    await deleteUserHttp(id)
}