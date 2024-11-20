import {Component} from "react";
import {TorrentItem} from "../../requests/responses/TorrentListResponse.ts";

interface TorrentListItemProps {
    torrent: TorrentItem
    onDelete: (id: number) => void;
}

export default class TorrentListItem extends Component<TorrentListItemProps, any> {
    handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this torrent?");
        if (confirmDelete) {
            this.props.onDelete(this.props.torrent.torrent.id);
        }
    };

    render() {
        const torrent = this.props.torrent.torrent;
        const transmissionTorrent = this.props.torrent.transmissionTorrent;

        return (
            <>
                <div>{torrent.id}</div>
                <div>{transmissionTorrent.name}</div>
                <div>{torrent.status}</div>
                <div>{transmissionTorrent.eta}</div>
                <div>{transmissionTorrent.down}</div>
                <div>{transmissionTorrent.done}</div>

                <button
                    onClick={this.handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                >
                    Delete
                </button>
            </>
        )
    }
}