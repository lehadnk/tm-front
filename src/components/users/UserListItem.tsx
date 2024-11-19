import {Component} from "react";
import {User} from "../../requests/responses/UserListResponse.ts";

interface UserListItemProps {
    data: User
}

export default class UserListItem extends Component<UserListItemProps, any> {
    render() {
        return (
            <>
                <p>{this.props.data.id}</p>
                <p>{this.props.data.name}</p>
                <a href={"/users/" + this.props.data.id}>Edit</a>
            </>
        )
    }
}