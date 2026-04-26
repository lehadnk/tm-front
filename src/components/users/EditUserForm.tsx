import {Component} from "react";
import {getUserById, saveUser} from "../../domain/UserService.ts";
import {Link, useNavigate, useParams} from "react-router-dom";

interface EditUserFormProps {
    userId?: string,
    navigate: (path: string) => void,
}

interface EditUserFormState {
    name: string
    email: string
    password: string
    role: string
    error: string | null;
    loading: boolean;
    saving: boolean;
}

export class EditUserForm extends Component<EditUserFormProps, EditUserFormState> {
    state: EditUserFormState = {
        name: "",
        email: "",
        password: "",
        role: "",
        error: null,
        loading: false,
        saving: false,
    }

    isEditing(): boolean {
        return this.props.userId != undefined;
    }

    formatRole(role: string): string {
        if (!role) {
            return "";
        }

        return role.charAt(0).toUpperCase() + role.slice(1);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<EditUserFormState, keyof EditUserFormState>);
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({ saving: true, error: null });

        try {
            await saveUser(this.state.name, this.state.email, this.state.password, this.state.role, this.props.userId ? parseInt(this.props.userId) : undefined);
            this.props.navigate("/users");
        } catch (e) {
            this.setState({ error: "Failed to save user. Please try again later." });
        } finally {
            this.setState({ saving: false });
        }
    };

    async loadUser(id: any) {
        if (id === undefined) {
            // Create user form
            return
        }
        this.setState({ loading: true, error: null });

        try {
            const user = await getUserById(parseInt(id))
            this.setState({
                name: user.name,
                email: user.email,
                password: "",
                role: user.role || "",
            });
        } catch (e) {
            this.setState({ error: "Failed to load user. Please try again later." });
        } finally {
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.loadUser(this.props.userId);
    }

    render() {
        const { name, email, password, role, error, loading, saving } = this.state;
        const isEditing = this.isEditing();

        return (
            <div className="app-shell">
                <div className="app-shell-bg absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_36%),radial-gradient(circle_at_82%_16%,_rgba(6,182,212,0.10),_transparent_28%),linear-gradient(180deg,_#f3f4f6_0%,_#eef3fb_14%,_#f7fafc_42%,_#eef2ff_100%)]" />
                <div className="app-shell-bg absolute left-[-8rem] top-32 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="app-shell-bg absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="page-enter relative mx-auto flex min-h-[calc(100dvh-var(--app-header-offset,0px)-2rem)] max-w-3xl items-center px-4 pb-8 pt-[calc(var(--app-header-offset,0px)+1rem)] sm:px-6 lg:px-8">
                    <section className="w-full rounded-[32px] border border-white/60 bg-white/82 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <Link
                                to="/users"
                                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white/75 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                            >
                                Back to Users
                            </Link>
                        </div>

                        <div className="mb-6">
                            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                {isEditing ? "Edit User" : "Create User"}
                            </div>
                            <h1 className="mt-2 text-2xl font-semibold text-slate-950">
                                {isEditing ? name || "User Profile" : "New User"}
                            </h1>
                        </div>

                        {error && <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

                        {loading ? (
                            <div className="space-y-5 animate-pulse">
                                <div className="h-20 rounded-[24px] bg-slate-100" />
                                <div className="h-20 rounded-[24px] bg-slate-100" />
                                <div className="h-20 rounded-[24px] bg-slate-100" />
                                <div className="h-20 rounded-[24px] bg-slate-100" />
                                <div className="h-12 rounded-[22px] bg-slate-200" />
                            </div>
                        ) : (
                            <form onSubmit={this.handleSubmit} className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={this.handleChange}
                                        required
                                        className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        required
                                        className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                                        autoComplete="off"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        className="w-full rounded-[22px] border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                                        autoComplete="off"
                                        placeholder={isEditing ? "Leave blank to keep current password" : ""}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="role">
                                        Role
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="role"
                                            name="role"
                                            value={role}
                                            onChange={this.handleChange}
                                            required
                                            className="w-full appearance-none rounded-[22px] border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
                                        >
                                            <option value="" disabled>
                                                Select Role
                                            </option>
                                            <option value="admin">{this.formatRole("admin")}</option>
                                            <option value="user">{this.formatRole("user")}</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                                <path d="M4 6.5L8 10L12 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className={`inline-flex w-full items-center justify-center rounded-[22px] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)] transition ${
                                        saving
                                            ? "cursor-not-allowed bg-slate-400 shadow-none"
                                            : "bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(37,99,235,0.35)]"
                                    }`}
                                >
                                    {saving ? "Saving..." : isEditing ? "Save Changes" : "Create User"}
                                </button>
                            </form>
                        )}
                    </section>
                </div>
            </div>
        );
    }
}

const EditUserFormWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()

    return <EditUserForm userId={id} navigate={navigate} />;
};

export default EditUserFormWrapper;
