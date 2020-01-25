import React from "react";
import { useHistory } from "react-router-dom";

function SignOut() {
    const history = useHistory();

    const signOut = (event) => {
        event.preventDefault();

        fetch("/api/signout", {
            credentials: "include",
        })
            .then(res => res.json())
            .then(result => {
                if (result.status === 200) {
                    history.push("/signin");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <a href="/signout" className="top-nav__link" onClick={signOut}>Sign out</a>
    );
}

export default SignOut;