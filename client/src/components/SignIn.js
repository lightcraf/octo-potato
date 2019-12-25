import React from "react";
import "./SignIn.scss";

function SignIn() {
    return (
        <form className="login-form">
            <label htmlFor="login-username">Username</label>
            <input type="text"
                id="login-username"
                className="login-form__input"
                name="username" />

            <label htmlFor="login-password">Password <a href="/login" className="label-link">Forgot password?</a></label>
            <input type="password"
                id="login-password"
                className="login-form__input"
                name="password" />

            <button type="submit" className="login-btn">Login</button>
        </form>
    );
}

export default SignIn;