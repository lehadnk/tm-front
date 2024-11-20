import {addTorrent, deleteTorrent, torrentsList} from "../requests/HttpRequests.ts";
import {TorrentListResponse} from "../requests/responses/TorrentListResponse.ts";

export async function getTorrentsList(page: number, limit: number): Promise<TorrentListResponse>
{
    return await torrentsList(page, limit);
}

export async function addTorrentFile(file: any): Promise<void>
{
    return await addTorrent(file);
}

export async function deleteTorrentFile(id: number): Promise<void>
{
    return await deleteTorrent(id);
}