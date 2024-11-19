import {Component} from "react";
import {ApplicationContext, ApplicationContextType} from "./context/ApplicationContext.ts";

export default class NavigationMenu extends Component {
    static context = ApplicationContext;

    render() {
        const { user } = this.context as ApplicationContextType;

        return (
            <>
                <a href="/torrents">Torrents</a>
                { user && user.type == 'admin' && <a href="/users">Users</a>}
                <a href="/users">Users</a>
            </>
        )
    }

}