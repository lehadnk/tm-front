import {Component} from "react";
import {User} from "../../requests/responses/UserListResponse.ts";
import {Link, useNavigate} from "react-router-dom";

interface UserListItemProps {
    data: User
    onDelete: (id: number) => void;
    navigate: (path: string) => void;
}

class UserListItem extends Component<UserListItemProps, any> {
    formatRole(role: string): string {
        if (!role) {
            return "";
        }

        return role.charAt(0).toUpperCase() + role.slice(1);
    }

    handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            this.props.onDelete(this.props.data.id);
        }
    };

    handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;

        if (target.closest("button, a")) {
            return;
        }

        this.props.navigate(`/users/${this.props.data.id}`);
    };

    render() {
        const { id, name, email, role } = this.props.data;
        return (
            <li
                onClick={this.handleCardClick}
                className="cursor-pointer overflow-hidden rounded-[24px] border border-white/60 bg-white/78 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.10)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            >
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full border border-slate-300/80 bg-slate-100/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                            #{id}
                        </span>
                        <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700">
                            {this.formatRole(role)}
                        </span>
                    </div>
                    <h2 className="mt-3 truncate text-lg font-semibold text-slate-950">{name}</h2>
                    <p className="mt-1 truncate text-sm text-slate-500">{email}</p>
                        </div>

                <div className="mt-5 flex items-center gap-2">
                    <Link
                        to={`/users/${id}`}
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={this.handleDelete}
                        className="inline-flex items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                    >
                        Delete
                    </button>
                </div>
            </li>
        );
    }
}

const UserListItemWrapper: React.FC<Omit<UserListItemProps, "navigate">> = (props) => {
    const navigate = useNavigate();

    return <UserListItem {...props} navigate={navigate} />;
};

export default UserListItemWrapper;
