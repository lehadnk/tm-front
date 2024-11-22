import {Component} from "react";
import {TorrentItem} from "../../requests/responses/TorrentListResponse.ts";

interface TorrentListItemProps {
    torrent: TorrentItem
    onDelete: (id: number) => void;
    index: number
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
            <tr className={`border-b ${this.props.index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                <td className="px-4 py-2 text-gray-800 text-center">{torrent.id}</td>
                <td className="px-4 py-2 text-gray-800 text-center">{transmissionTorrent.name}</td>
                <td className="px-4 py-2 text-gray-800 text-center">{torrent.status}</td>
                <td className="px-4 py-2 text-gray-800 text-center">{transmissionTorrent.eta}</td>
                <td className="px-4 py-2 text-gray-800 text-center">{transmissionTorrent.down}</td>
                <td className="px-4 py-2 text-gray-800 text-center">{transmissionTorrent.done}%</td>
                <td className="px-4 py-2 text-center">
                    <button
                        onClick={this.handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}