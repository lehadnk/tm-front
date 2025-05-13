import {Component} from "react";
import {User, UserListResponse} from "../../requests/responses/UserListResponse.ts";
import {deleteUser, getUserList} from "../../domain/UserService.ts";
import UserListItem from "./UserListItem.tsx";
import {Link} from "react-router-dom";

interface UserListState {
    data: UserListResponse | null,
    page: number,
    limit: number
}

export default class UserList extends Component<any, UserListState> {
    state: UserListState = {
        data: null,
        page: 1,
        limit: 10
    };

    async getData() {
        const data = await getUserList(this.state.page, this.state.limit)
        this.setState({data: data})
    }

    async componentDidMount() {
        await this.getData();
    }

    async deleteUser(id: number) {
        await deleteUser(id);
        await this.getData();
    }

    render() {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">User List</h1>
                <Link to="/users/create" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-6">Create User</Link>
                {this.state.data ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {this.state.data.users.map((user: User) => (
                            <UserListItem key={user.id} data={user} onDelete={() => this.deleteUser(user.id)} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 text-lg">Loading...</p>
                )}
            </div>
        );
    }
}