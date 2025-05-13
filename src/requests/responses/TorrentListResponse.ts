export interface DatabaseData {
    id: number;
    status: string;
}

export interface TransmissionData {
    id: number;
    name: string;
    eta: string;
    down: string;
    done: string;
}

export interface TorrentItem {
    databaseData: DatabaseData
    transmissionData: TransmissionData
}

export interface TorrentListResponse {
    count: number;
    torrents: TorrentItem[];
}