import {authenticate} from "../domain/AuthenticationService.ts";
import {useNavigate} from "react-router-dom";
import {UnauthenticatedException} from "../requests/exceptions/UnauthenticatedException.ts";
import React, {Component} from "react";
import {isAuthenticated} from "../requests/TokenStorage.ts";

interface LoginFormProps {
    navigate: (path: string) => void,
}

interface LoginFormState {
    email: string
    password: string
    errorMessage: string | null
}

export class LoginForm extends Component<LoginFormProps, LoginFormState>
{
    state: LoginFormState = {
        email: "",
        password: "",
        errorMessage: null,
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as Pick<LoginFormState, keyof LoginFormState>);
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await authenticate(email, password);
            this.props.navigate("/torrents");
        } catch (e: unknown) {
            if (e instanceof UnauthenticatedException) {
                this.setState({ errorMessage: "Invalid email or password. Please try again." });
            } else {
                this.setState({ errorMessage: "An error occurred. Please try again later." });
            }
        }
    };

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.navigate("/torrents");
        }
    }

    render() {
        const { email, password, errorMessage } = this.state;

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Login to Your Account
                    </h2>
                    {errorMessage && (
                        <div className="mb-4 text-red-500 text-center font-medium">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={this.handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const LoginFormWrapper: React.FC = () => {
    const navigate = useNavigate()

    return <LoginForm navigate={navigate} />;
}

export default LoginFormWrapper;