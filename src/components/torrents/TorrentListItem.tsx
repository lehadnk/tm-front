import {Component} from "react";
import {TorrentItem} from "../../requests/responses/TorrentListResponse.ts";

interface TorrentListItemProps {
    torrent: TorrentItem
    onDelete: (id: number) => void;
    index: number
}

export default class TorrentListItem extends Component<TorrentListItemProps, any> {
    formatSpeed = (downKbpsStr: string): string => {
        const downKbps = parseFloat(downKbpsStr);

        if (isNaN(downKbps) || downKbps <= 0) {
            return "0 MB/s";
        }

        const mbps = downKbps / 1024;

        if (mbps < 1) return `${mbps.toFixed(2)} MB/s`;
        if (mbps < 100) return `${mbps.toFixed(1)} MB/s`;
        return `${Math.round(mbps)} MB/s`;
    };

    formatEta = (eta: string): string => {
        if (!eta || eta === "-1") {
            return "Unknown";
        }

        if (eta === "0") {
            return "Done";
        }

        return eta;
    };

    getStatusTone = (status: string): string => {
        const normalizedStatus = status.toLowerCase();

        if (normalizedStatus.includes("download") || normalizedStatus.includes("progress")) {
            return "border-emerald-300/70 bg-emerald-50/80 text-emerald-800";
        }

        if (normalizedStatus.includes("queue") || normalizedStatus.includes("wait")) {
            return "border-amber-300/70 bg-amber-50/80 text-amber-800";
        }

        if (normalizedStatus.includes("error") || normalizedStatus.includes("fail")) {
            return "border-rose-300/70 bg-rose-50/80 text-rose-800";
        }

        return "border-slate-300/70 bg-slate-100/80 text-slate-700";
    };

    handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this torrent?");
        if (confirmDelete) {
            this.props.onDelete(this.props.torrent.databaseData.id);
        }
    };

    render() {
        const torrent = this.props.torrent.databaseData;
        const transmissionTorrent = this.props.torrent.transmissionData;
        const done = Math.min(100, Math.max(0, parseFloat(transmissionTorrent.done) || 0));

        return (
            <article
                className={`group relative overflow-hidden rounded-[22px] border border-white/60 bg-white/80 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.14)] ${
                    this.props.index % 2 === 0 ? "lg:-translate-y-0.5" : ""
                }`}
            >
                <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-70" />
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full border border-slate-300/80 bg-slate-100/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                                #{torrent.id}
                            </span>
                            <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${this.getStatusTone(torrent.status)}`}>
                                {torrent.status}
                            </span>
                            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                                ETA {this.formatEta(transmissionTorrent.eta)}
                            </span>
                            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                                {this.formatSpeed(transmissionTorrent.down)}
                            </span>
                            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                                {done.toFixed(done % 1 === 0 ? 0 : 1)}%
                            </span>
                        </div>
                        <h2 className="mt-2 pr-2 text-base font-semibold leading-tight text-slate-900 md:text-lg">
                            {transmissionTorrent.name}
                        </h2>
                        <div className="mt-2 flex items-center gap-3">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200/80">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 transition-all duration-500"
                                    style={{ width: `${done}%` }}
                                />
                            </div>
                            <span className="shrink-0 text-xs font-medium text-slate-500">Done</span>
                        </div>
                    </div>
                    <div className="flex lg:justify-end">
                        <button
                            onClick={this.handleDelete}
                            className="inline-flex items-center justify-center rounded-xl border border-rose-200 bg-white/90 px-3 py-2 text-xs font-semibold text-rose-700 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </article>
        );
    }
}
