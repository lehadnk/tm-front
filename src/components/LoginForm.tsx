import {authenticate} from "../domain/AuthenticationService.ts";
import {useNavigate} from "react-router-dom";
import {UnauthenticatedException} from "../requests/exceptions/UnauthenticatedException.ts";
import React, {Component} from "react";
import {isAuthenticated} from "../requests/TokenStorage.ts";
import {CurrentUserResponse} from "../requests/responses/CurrentUserResponse.ts";
import BrandMark from "./BrandMark.tsx";

interface LoginFormProps {
    navigate: (path: string) => void,
    login: (user: CurrentUserResponse) => void,
}

interface LoginFormState {
    email: string
    password: string
    errorMessage: string | null
    isSubmitting: boolean
    isTransitioning: boolean
}

export class LoginForm extends Component<LoginFormProps, LoginFormState>
{
    state: LoginFormState = {
        email: "",
        password: "",
        errorMessage: null,
        isSubmitting: false,
        isTransitioning: false,
    };

    navigateTimeout: number | null = null;

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<LoginFormState, keyof LoginFormState>);
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { email, password } = this.state;

        if (this.state.isSubmitting) {
            return;
        }

        this.setState({ isSubmitting: true, errorMessage: null });

        try {
            const currentUserResponse = await authenticate(email, password);
            this.props.login(currentUserResponse);
            this.setState({ isTransitioning: true });
            this.navigateTimeout = window.setTimeout(() => {
                this.props.navigate("/torrents");
            }, 360);
        } catch (e: unknown) {
            if (e instanceof UnauthenticatedException) {
                this.setState({ errorMessage: "Invalid email or password. Please try again.", isSubmitting: false });
            } else {
                this.setState({ errorMessage: "An error occurred. Please try again later.", isSubmitting: false });
            }
        }
    };

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.navigate("/torrents");
        }
    }

    componentWillUnmount() {
        if (this.navigateTimeout !== null) {
            window.clearTimeout(this.navigateTimeout);
        }
    }

    render() {
        const { email, password, errorMessage, isSubmitting, isTransitioning } = this.state;

        return (
            <div className={`relative min-h-screen overflow-hidden px-4 transition-all duration-500 ${isTransitioning ? "bg-slate-950" : "bg-[#eef2f7]"}`}>
                <div className={`absolute inset-0 transition-all duration-500 ${isTransitioning ? "opacity-70" : "opacity-100"}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.10),_transparent_32%),radial-gradient(circle_at_80%_12%,_rgba(6,182,212,0.08),_transparent_24%),linear-gradient(180deg,_#f1f4f8_0%,_#edf2f7_42%,_#eef2ff_100%)]" />
                    <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
                    <div className="absolute right-[-6rem] top-20 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />
                </div>

                <div className="relative flex min-h-screen items-center justify-center">
                    <div className={`relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/65 bg-white/72 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-500 ${isTransitioning ? "scale-[0.97] opacity-0 blur-sm" : "scale-100 opacity-100"}`}>
                        <div className={`pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.32)_42%,transparent_76%)] transition-transform duration-700 ${isTransitioning ? "translate-x-full" : "-translate-x-full"}`} />
                        <div className="relative mb-7">
                            <div className="mb-6 flex justify-center">
                                <BrandMark size={52} />
                            </div>
                            <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-950">Sign in</h2>
                        </div>
                    {errorMessage && (
                        <div className="-mt-2 mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={this.handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}
                                disabled={isSubmitting}
                                className="w-full rounded-[22px] border border-slate-200/80 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={this.handleInputChange}
                                disabled={isSubmitting}
                                className="w-full rounded-[22px] border border-slate-200/80 bg-white/90 px-4 py-3 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center rounded-[22px] bg-gradient-to-r from-slate-900 via-blue-900 to-sky-600 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(15,23,42,0.28)] focus:outline-none focus:ring-4 focus:ring-sky-100"
                        >
                            {isSubmitting ? "Signing in..." : "Login"}
                        </button>
                        </form>
                    </div>
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
