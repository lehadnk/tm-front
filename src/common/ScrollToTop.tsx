import {useLayoutEffect} from "react";
import {useLocation} from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, search, hash } = useLocation();

    useLayoutEffect(() => {
        const previousScrollRestoration = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";

        window.scrollTo(0, 0);
        const frameId = window.requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });

        return () => {
            window.cancelAnimationFrame(frameId);
            window.history.scrollRestoration = previousScrollRestoration;
        };
    }, [pathname, search, hash]);

    return null;
}
