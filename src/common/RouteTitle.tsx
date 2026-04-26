import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const APP_NAME = "Media Dock";

function getTitle(pathname: string): string {
    if (pathname === "/" || pathname === "/login") {
        return `${APP_NAME} - Sign In`;
    }

    if (pathname === "/torrents") {
        return `${APP_NAME} - Torrents`;
    }

    if (pathname === "/torrents/add") {
        return `${APP_NAME} - Add Torrent`;
    }

    if (pathname === "/users") {
        return `${APP_NAME} - Users`;
    }

    if (pathname === "/users/create") {
        return `${APP_NAME} - New User`;
    }

    if (pathname.startsWith("/users/")) {
        return `${APP_NAME} - Edit User`;
    }

    return APP_NAME;
}

export default function RouteTitle() {
    const location = useLocation();

    useEffect(() => {
        document.title = getTitle(location.pathname);
    }, [location.pathname]);

    return null;
}
