import {TorrentListResponse} from "../requests/responses/TorrentListResponse.ts";
import {UserListResponse} from "../requests/responses/UserListResponse.ts";

interface TorrentListCache {
    data: TorrentListResponse | null;
    freeSpace: number | null;
}

interface UserListCache {
    data: UserListResponse | null;
}

const torrentListCache: TorrentListCache = {
    data: null,
    freeSpace: null,
};

const userListCache: UserListCache = {
    data: null,
};

export function getTorrentListCache(): TorrentListCache {
    return torrentListCache;
}

export function setTorrentListCache(data: TorrentListResponse, freeSpace: number | null) {
    torrentListCache.data = data;
    torrentListCache.freeSpace = freeSpace;
}

export function getUserListCache(): UserListCache {
    return userListCache;
}

export function setUserListCache(data: UserListResponse) {
    userListCache.data = data;
}
