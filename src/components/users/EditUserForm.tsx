import {Component} from "react";
import {getUserById} from "../../domain/UserService.ts";
import {useParams} from "react-router-dom";

interface EditUserFormProps {
    userId?: string
}

interface EditUserFormState {
    name: string
    email: string
    password: string
    role: string
}

export class EditUserForm extends Component<EditUserFormProps, EditUserFormState> {
    state: EditUserFormState = {
        name: "",
        email: "",
        password: "",
        role: "",
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<EditUserFormState, keyof EditUserFormState>);
    };

    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
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
        const { name, email, password, role } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Edit User Form</h2>

                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Role:
                        <select
                            name="role"
                            value={role}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </label>
                </div>

                <button type="submit">Save Changes</button>
            </form>
        );
    }
}

const EditUserFormWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return <EditUserForm userId={id} />;
};

export default EditUserFormWrapper;