import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./SignIn.scss";

function SignIn() {
    const history = useHistory();
    const [values, setValues] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState(false);

    useEffect(() => {
        document.title = "Sign in";
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setValues({ ...values, [name]: value });
        setLoginError(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = values;

        if (username.trim().length > 0 && password.trim().length > 0) {
            fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username, password: password
                })
            })
                .then(res => res.json())
                .then(result => {
                    if (result.hasOwnProperty("errors")) {
                        setLoginError(result.errors.loginError);
                    } else if (result.status === 200) {
                        history.push("/");
                    }
                })
                .catch(err => console.log(err));
        } else {
            setLoginError(true);
        }
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username</label>
            <input type="text"
                id="login-username"
                className={"login-form__input form-control" + (loginError ? " error" : "")}
                name="username"
                value={values.username}
                onChange={handleInputChange} />

            <label htmlFor="login-password">Password <a href="/login" className="label-link">Forgot password?</a></label>
            <input type="password"
                id="login-password"
                className={"login-form__input form-control" + (loginError ? " error" : "")}
                name="password"
                value={values.password}
                onChange={handleInputChange} />

            {loginError ? <span className="signup-error-message">Incorrect username or password.</span> : null}

            <button type="submit" className="login-btn">Login</button>
        </form>
    );
}

export default SignIn;