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

    constructor(id: number, name: string, eta: string) {
        this.id = id;
        this.name = name;
        this.eta = eta;
    }
}

export class TorrentListResponse {
    count: number;
    torrents: Torrent[];

    constructor(count: number) {
        this.count = count;
        this.torrents = [];
    }

}