export interface Torrent {
    id: number;
    status: string;
}

export interface TransmissionTorrent {
    id: number;
    name: string;
    eta: string;
    down: string;
    done: string;
}

export interface TorrentItem {
    torrent: Torrent
    transmissionTorrent: TransmissionTorrent
}

export interface TorrentListResponse {
    count: number;
    torrents: TorrentItem[];
}