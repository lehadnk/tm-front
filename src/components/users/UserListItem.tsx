import {Component} from "react";
import {User} from "../../requests/responses/UserListResponse.ts";

interface UserListItemProps {
    data: User
    onDelete: (id: number) => void;
}

export default class UserListItem extends Component<UserListItemProps, any> {
    handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this torrent?");
        if (confirmDelete) {
            this.props.onDelete(this.props.data.id);
        }
    };

    render() {
        const { id, name, email, role } = this.props.data;
        return (
            <li className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="mb-2">
                    <span className="text-gray-500 text-sm">ID: </span>
                    <span className="font-medium text-gray-800">{id}</span>
                </div>
                <div className="mb-2">
                    <span className="text-gray-500 text-sm">Name: </span>
                    <span className="font-medium text-gray-800">{name}</span>
                </div>
                <div className="mb-2">
                    <span className="text-gray-500 text-sm">Email: </span>
                    <span className="font-medium text-gray-800">{email}</span>
                </div>
                <div className="mb-4">
                    <span className="text-gray-500 text-sm">Role: </span>
                    <span className="font-medium text-gray-800 capitalize">{role}</span>
                </div>
                <div className="flex gap-2">
                    <a
                        href={`/users/${id}`}
                        className="inline-block bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                    >
                        Edit
                    </a>
                    <a
                        onClick={this.handleDelete}
                        className="inline-block bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                    >
                        Delete
                    </a>
                </div>
            </li>
        );
    }
}