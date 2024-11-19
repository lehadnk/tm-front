import {Component} from "react";
import {getUserById, saveUser} from "../../domain/UserService.ts";
import {useNavigate, useParams} from "react-router-dom";

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
}

export class EditUserForm extends Component<EditUserFormProps, EditUserFormState> {
    state: EditUserFormState = {
        name: "",
        email: "",
        password: "",
        role: "",
        error: null
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<EditUserFormState, keyof EditUserFormState>);
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await saveUser(this.state.name, this.state.email, this.state.password, this.state.role, this.props.userId ? parseInt(this.props.userId) : undefined);
            this.props.navigate("/users");
        } catch (e) {
            this.setState({ error: "Failed to save user. Please try again later." });
        }
    };

    async loadUser(id: any) {
        if (id === undefined) {
            // Create user form
            return
        }
        const user = await getUserById(parseInt(id))
        this.setState({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role || "",
        });
    }

    componentDidMount() {
        this.loadUser(this.props.userId);
    }

    render() {
        const { name, email, password, role, error } = this.state;

        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit User Form</h2>

                {error && <div className="text-red-500 bg-red-100 p-4 mb-4 rounded">{error}</div>}

                <form onSubmit={this.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="role">
                            Role:
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={this.handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
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