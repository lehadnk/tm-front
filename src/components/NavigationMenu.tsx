import {Component} from "react";
import {deleteToken} from "../requests/TokenStorage.ts";
import {CurrentUserResponse} from "../requests/responses/CurrentUserResponse.ts";
import {ApplicationContext} from "./context/ApplicationContext.ts";

interface NavigationMenuProps {
    user: CurrentUserResponse
}

export default class NavigationMenu extends Component<NavigationMenuProps, any> {
    static contextType = ApplicationContext;

    handleLogout = () => {
        deleteToken();
        window.location.href = '/login';
    };

    componentDidMount() {
        if (this.props.user) {
            document.body.classList.add("with-header");
        } else {
            document.body.classList.remove("with-header");
        }
    }

    componentDidUpdate() {
        if (this.props.user) {
            document.body.classList.add("with-header");
        } else {
            document.body.classList.remove("with-header");
        }
    }

    componentWillUnmount() {
        document.body.classList.remove("with-header");
    }

    render() {
        const user = this.props.user;

        return (
            <>
                <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
                    <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                        <div className="flex space-x-6">
                            <a href="/torrents" className="hover:bg-blue-700 px-3 py-2 rounded-md text-lg">
                                Torrents
                            </a>
                            {user && user.role === 'admin' && (
                                <a href="/users" className="hover:bg-blue-700 px-3 py-2 rounded-md text-lg">
                                    Users
                                </a>
                            )}
                        </div>

                        {user && (
                            <div className="flex items-center space-x-4">
                                <span className="text-lg font-semibold">{user.name}</span>
                                <button
                                    onClick={this.handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </>
        );
    }
}