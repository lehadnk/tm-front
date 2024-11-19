import {Component} from "react";
import {User, UserListResponse} from "../../requests/responses/UserListResponse.ts";
import {getUserList} from "../../domain/UserService.ts";
import UserListItem from "./UserListItem.tsx";

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

    render() {
        return (
            <>
                <h1>User List</h1>
                {this.state.data ? (
                    <ul>
                        {this.state.data.users.map((user: User) => (
                            <UserListItem key={user.id} data={user} />
                        ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </>
        );
    }
}