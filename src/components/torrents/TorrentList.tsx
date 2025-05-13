import {Component} from "react";
import {TorrentListResponse} from "../../requests/responses/TorrentListResponse.ts";
import {deleteTorrentFile, getTorrentsList} from "../../domain/TorrentService.ts";
import TorrentListItem from "./TorrentListItem.tsx";
import {getFreeSpace} from "../../requests/HttpRequests.ts";
import {Link} from "react-router-dom";

interface TorrentListState {
    data: TorrentListResponse | null,
    page: number,
    limit: number,
    freeSpace: number | null,
}

export default class TorrentList extends Component<any, TorrentListState> {
    state: TorrentListState = {
        data: null,
        page: 1,
        limit: 10,
        freeSpace: null,
    };

    intervalId: NodeJS.Timeout | null = null;

    async getData() {
        const data = await getTorrentsList(this.state.page, this.state.limit)
        this.setState({data: data})

        const freeSpace = await getFreeSpace()
        this.setState({freeSpace: freeSpace})
    }

    async componentDidMount() {
        await this.getData();
        this.intervalId = setInterval(() => this.getData(), 2000);
    }

    async deleteTorrent(id: number) {
        await deleteTorrentFile(id);
        await this.getData();
    }

    render() {
        const { freeSpace } = this.state;

        return (
            <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Torrent List</h1>
                    <Link to="/torrents/add" className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"> Add Torrent</Link>
                </div>

                {/* Display Free Space */}
                <div className="flex items-center mb-6">
                    <div className="text-lg font-semibold text-gray-700 mr-2">Free Space:</div>
                    <div className="text-lg text-gray-600">
                        {freeSpace === null ? (
                            <span>Loading...</span>
                        ) : (
                            <span>{(freeSpace / 1024).toFixed(2)} GB</span> // Convert MB to GB
                        )}
                    </div>
                </div>

                {/* Torrent List Table */}
                {this.state.data ? (
                    <div className="overflow-x-auto mt-6">
                        <table className="table-auto w-full bg-white shadow-md rounded-md">
                            <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 w-16">ID</th>
                                <th className="px-4 py-2 w-64">Name</th>
                                <th className="px-4 py-2 w-32">Status</th>
                                <th className="px-4 py-2 w-24">ETA</th>
                                <th className="px-4 py-2 w-24">Down</th>
                                <th className="px-4 py-2 w-24">Done</th>
                                <th className="px-4 py-2 w-32">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.data.torrents.map((torrent, index) => (
                                <TorrentListItem
                                    key={torrent.databaseData.id}
                                    torrent={torrent}
                                    onDelete={() => this.deleteTorrent(torrent.databaseData.id)}
                                    index={index}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600 text-lg">Loading...</p>
                )}
            </div>
        );
    }
}