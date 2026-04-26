import {Component} from "react";
import {TorrentListResponse} from "../../requests/responses/TorrentListResponse.ts";
import {deleteTorrentFile, getTorrentsList} from "../../domain/TorrentService.ts";
import TorrentListItem from "./TorrentListItem.tsx";
import {getFreeSpace} from "../../requests/HttpRequests.ts";
import {Link} from "react-router-dom";
import {getTorrentListCache, setTorrentListCache} from "../../common/ViewCache.ts";

interface TorrentListState {
    data: TorrentListResponse | null,
    page: number,
    limit: number,
    freeSpace: number | null,
}

export default class TorrentList extends Component<any, TorrentListState> {
    state: TorrentListState = {
        data: getTorrentListCache().data,
        page: 1,
        limit: 10,
        freeSpace: getTorrentListCache().freeSpace,
    };

    intervalId: NodeJS.Timeout | null = null;

    async getData() {
        const data = await getTorrentsList(this.state.page, this.state.limit)
        this.setState({data: data})

        const freeSpace = await getFreeSpace()
        this.setState({freeSpace: freeSpace})
        setTorrentListCache(data, freeSpace)
    }

    async componentDidMount() {
        void this.getData();
        this.intervalId = setInterval(() => this.getData(), 2000);
    }

    componentWillUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    async deleteTorrent(id: number) {
        await deleteTorrentFile(id);
        await this.getData();
    }

    formatFreeSpace(freeSpace: number | null): string {
        if (freeSpace === null) {
            return "Syncing...";
        }

        return `${(freeSpace / 1024).toFixed(2)} GB`;
    }

    render() {
        const { data, freeSpace } = this.state;

        return (
            <div className="app-shell">
                <div className="app-shell-bg absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_36%),radial-gradient(circle_at_85%_18%,_rgba(14,165,233,0.10),_transparent_28%),linear-gradient(180deg,_#f3f4f6_0%,_#eef3fb_14%,_#f7fafc_42%,_#eef2ff_100%)]" />
                <div className="app-shell-bg absolute left-[-10rem] top-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="app-shell-bg absolute right-[-8rem] top-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />

                <div className="page-enter relative mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-6 pt-[calc(var(--app-header-offset,0px)+1rem)] sm:px-6 lg:px-8">
                    <section className="rounded-[24px] border border-white/60 bg-white/72 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.10)] backdrop-blur sm:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Torrents</h1>
                                <p className="mt-1 text-sm text-slate-500">
                                    {data ? `${data.count} items` : "Loading..."} · Free space {this.formatFreeSpace(freeSpace)}
                                </p>
                            </div>
                            <div className="flex shrink-0 items-center gap-3">
                                <Link
                                    to="/torrents/add"
                                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(37,99,235,0.35)]"
                                >
                                    Add Torrent
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-[24px] border border-white/60 bg-white/68 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5">
                        {data ? (
                            data.torrents.length > 0 ? (
                                <div className="grid gap-5">
                                    {data.torrents.map((torrent, index) => (
                                        <TorrentListItem
                                            key={torrent.databaseData.id}
                                            torrent={torrent}
                                            onDelete={() => this.deleteTorrent(torrent.databaseData.id)}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50/80 px-6 py-14 text-center">
                                    <div className="text-2xl font-semibold text-slate-900">No torrents yet</div>
                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        Добавьте `.torrent` файл, и очередь появится здесь с прогрессом, скоростью и ETA.
                                    </p>
                                    <Link
                                        to="/torrents/add"
                                        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        Upload First Torrent
                                    </Link>
                                </div>
                            )
                        ) : (
                            <div className="grid gap-4">
                                {[0, 1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="animate-pulse rounded-[22px] border border-white/70 bg-white/80 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
                                    >
                                        <div className="h-4 w-24 rounded-full bg-slate-200" />
                                        <div className="mt-3 h-6 w-3/5 rounded-full bg-slate-200" />
                                        <div className="mt-4 grid gap-2.5 md:grid-cols-3">
                                            <div className="h-16 rounded-xl bg-slate-100" />
                                            <div className="h-16 rounded-xl bg-slate-100" />
                                            <div className="h-16 rounded-xl bg-slate-100" />
                                        </div>
                                        <div className="mt-4 h-2 rounded-full bg-slate-200" />
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
