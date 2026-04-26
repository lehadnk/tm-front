import {Component} from "react";
import {User, UserListResponse} from "../../requests/responses/UserListResponse.ts";
import {deleteUser, getUserList} from "../../domain/UserService.ts";
import UserListItem from "./UserListItem.tsx";
import {Link} from "react-router-dom";
import {getUserListCache, setUserListCache} from "../../common/ViewCache.ts";

interface UserListState {
    data: UserListResponse | null,
    page: number,
    limit: number
}

export default class UserList extends Component<any, UserListState> {
    state: UserListState = {
        data: getUserListCache().data,
        page: 1,
        limit: 10
    };

    async getData() {
        const data = await getUserList(this.state.page, this.state.limit)
        this.setState({data: data})
        setUserListCache(data)
    }

    async componentDidMount() {
        void this.getData();
    }

    async deleteUser(id: number) {
        await deleteUser(id);
        await this.getData();
    }

    render() {
        const { data } = this.state;

        return (
            <div className="app-shell">
                <div className="app-shell-bg absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_36%),radial-gradient(circle_at_82%_16%,_rgba(6,182,212,0.10),_transparent_28%),linear-gradient(180deg,_#f3f4f6_0%,_#eef3fb_14%,_#f7fafc_42%,_#eef2ff_100%)]" />
                <div className="app-shell-bg absolute left-[-8rem] top-32 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="app-shell-bg absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="page-enter relative mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-6 pt-[calc(var(--app-header-offset,0px)+1rem)] sm:px-6 lg:px-8">
                    <section className="rounded-[24px] border border-white/60 bg-white/72 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Users</h1>
                                <p className="mt-1 text-sm text-slate-500">
                                    {data ? `${data.count} accounts` : "Loading users..."}
                                </p>
                            </div>
                            <Link
                                to="/users/create"
                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.35)]"
                            >
                                Create User
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-[24px] border border-white/60 bg-white/68 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5">
                        {data ? (
                            data.users.length > 0 ? (
                                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {data.users.map((user: User) => (
                                        <UserListItem key={user.id} data={user} onDelete={() => this.deleteUser(user.id)} />
                                    ))}
                                </ul>
                            ) : (
                                <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-14 text-center">
                                    <div className="text-2xl font-semibold text-slate-900">No users yet</div>
                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        Создайте первую учётную запись, и она появится здесь.
                                    </p>
                                    <Link
                                        to="/users/create"
                                        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Create First User
                                    </Link>
                                </div>
                            )
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {[0, 1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="animate-pulse rounded-[24px] border border-white/70 bg-white/80 p-5 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-slate-200" />
                                            <div className="flex-1">
                                                <div className="h-4 w-24 rounded-full bg-slate-200" />
                                                <div className="mt-3 h-6 w-2/3 rounded-full bg-slate-200" />
                                                <div className="mt-2 h-4 w-3/4 rounded-full bg-slate-100" />
                                            </div>
                                        </div>
                                        <div className="mt-5 flex gap-2">
                                            <div className="h-10 w-24 rounded-2xl bg-slate-200" />
                                            <div className="h-10 w-24 rounded-2xl bg-slate-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        );
    }
}
