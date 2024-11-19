import {Component} from "react";
import {TorrentListResponse} from "../requests/responses/TorrentListResponse.ts";

interface TorrentListState {
    data: TorrentListResponse
}

export default class TorrentList extends Component<any, TorrentListState> {
    render() {
        return (
            <>
                Torrent List
            </>
        );
    }
}