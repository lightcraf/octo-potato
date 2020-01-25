import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function useUserStatus() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("/api/verify", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setIsLoggedIn(data.isLoggedIn);
                setUsername(data.username);
            })
            .catch(err => console.log(err));

    }, [location.pathname]);

    return {isLoggedIn, username};
}

export default useUserStatus;