// RouteWatcher.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteWatcher = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            // 🚀 Auto-logout when going to Home
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [location]);

    return null; // no UI
};

export default RouteWatcher;
