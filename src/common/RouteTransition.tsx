import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";

export default function RouteTransition() {
    const location = useLocation();
    const [transitionKey, setTransitionKey] = useState(0);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setTransitionKey((key) => key + 1);
    }, [location.pathname, location.search]);

    if (transitionKey === 0) {
        return null;
    }

    return <div key={transitionKey} className="route-transition-overlay" aria-hidden="true" />;
}
