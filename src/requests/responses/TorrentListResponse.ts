export class Torrent {
    id: number;
    status: string;

    constructor(id: number, status: string) {
        this.id = id;
        this.status = status;
    }
}

export class TransmissionTorrent {
    id: number;
    name: string;
    eta: string;
    down: string;
    done: string;

    constructor(id: number, name: string, eta: string, down: string, done: string) {
        this.id = id;
        this.name = name;
        this.eta = eta;
        this.down = down;
        this.done = done;
    }
}

export class TorrentItem {
    torrent: Torrent
    transmissionTorrent: TransmissionTorrent

    constructor(torrent: Torrent, transmissionTorrent: TransmissionTorrent) {
        this.torrent = torrent;
        this.transmissionTorrent = transmissionTorrent;
    }
}

export class TorrentListResponse {
    count: number;
    torrents: TorrentItem[];

    constructor(count: number) {
        this.count = count;
        this.torrents = [];
    }

}