import React from "react";

function SignUp() {
    return (
        <form className="login-form">
            <label htmlFor="signup-username">Name</label>
            <input type="text"
                id="signup-username"
                className="login-form__input form-control"
                name="username" />

            <label htmlFor="signup-email">Email</label>
            <input type="email"
                id="signup-email"
                className="login-form__input form-control"
                name="email" />

            <label htmlFor="signup-password">Password</label>
            <input type="password"
                id="signup-password"
                className="login-form__input form-control"
                name="password" />
            <span className="form-privacy">
                By creating an account you agree to our <a href="/" className="form-privacy-link">Terms & Privacy</a>.
            </span>

            <button type="submit" className="login-btn">Sign Up</button>
        </form>
    );
}

export default SignUp;