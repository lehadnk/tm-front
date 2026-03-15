import {authenticate} from "../domain/AuthenticationService.ts";
import {useNavigate} from "react-router-dom";
import {UnauthenticatedException} from "../requests/exceptions/UnauthenticatedException.ts";
import React, {Component} from "react";
import {isAuthenticated} from "../requests/TokenStorage.ts";
import {CurrentUserResponse} from "../requests/responses/CurrentUserResponse.ts";

interface LoginFormProps {
    navigate: (path: string) => void,
    login: (user: CurrentUserResponse) => void,
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
            var currentUserResponse = await authenticate(email, password);
            this.props.navigate("/torrents");
            this.props.login(currentUserResponse)
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
                <div className="bg-white/95 backdrop-blur border border-white/40 rounded-2xl shadow-xl shadow-black/10 p-8 space-y-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
                    {errorMessage && (
                        <div className="-mt-3 mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit} className="space-y-4">
                        <div className="">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-white focus:ring-4 focus:ring-white/30"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={this.handleInputChange}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-white focus:ring-4 focus:ring-white/30"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 shadow-lg shadow-black/20 transition hover:from-indigo-500 hover:to-purple-500 active:translate-y-px focus:outline-none focus:ring-4 focus:ring-white/35"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

interface LoginFormWrapperProps
{
    login: (user: CurrentUserResponse) => void
}

const LoginFormWrapper: React.FC<LoginFormWrapperProps> = ({login}) => {
    const navigate = useNavigate()

    return <LoginForm login={login} navigate={navigate} />;
}

export default LoginFormWrapper;