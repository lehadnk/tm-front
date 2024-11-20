import {Component} from "react";
import {TorrentItem, TorrentListResponse} from "../../requests/responses/TorrentListResponse.ts";
import {deleteTorrentFile, getTorrentsList} from "../../domain/TorrentService.ts";
import TorrentListItem from "./TorrentListItem.tsx";

interface TorrentListState {
    data: TorrentListResponse | null,
    page: number,
    limit: number
}

export default class TorrentList extends Component<any, TorrentListState> {
    state: TorrentListState = {
        data: null,
        page: 1,
        limit: 10
    };

    async getData() {
        const data = await getTorrentsList(this.state.page, this.state.limit)
        this.setState({data: data})
    }

    async componentDidMount() {
        await this.getData();
    }

    async deleteTorrent(id: number) {
        await deleteTorrentFile(id);
        await this.getData();
    }

    render() {
        return (
            <>
                <div className="p-6 bg-gray-100 min-h-screen">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">User List</h1>
                    <a
                        href="/torrents/add"
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 mb-6"
                    >
                        Add torrent
                    </a>
                    {this.state.data ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {this.state.data.torrents.map((torrent: TorrentItem) => (
                                <TorrentListItem key={torrent.torrent.id} torrent={torrent} onDelete={() => this.deleteTorrent(torrent.torrent.id)} />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 text-lg">Loading...</p>
                    )}
                </div>
            </>
        );
    }
}