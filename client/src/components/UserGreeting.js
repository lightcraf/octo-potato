import React, { Fragment } from "react";
import SignOut from "./Registration/SignOut";

function UserGreating(props) {
    const username = props.username;

    return (
        <Fragment>
            <li className="top-nav__item">
                <SignOut />
            </li>
            <li className="top-nav__item">
                <div className="welcome-user">Welcome <br/>
                    <span className="welcome-user__username">{username}</span>
                </div>
            </li>
        </Fragment>
    );
}

export default UserGreating;