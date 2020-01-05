import React, { useState } from "react";
import "./SignIn.scss";

function SignIn() {
    const initialState = { username: "", password: "" };
    const [values, setValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({ isNameValid: false, isPasswordValid: false });
    const [submitError, setSubmitError] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;        
        const USERNAME_PATTERN = /^[a-zA-Z0-9]{2,16}$/;
        const PASSWORD_PATTERN = /^.{6,}$/;

        setValues({...values, [name]: value});
        setSubmitError(false);

        if (name === "username") {
            if (USERNAME_PATTERN.test(value)) {
                setFormErrors(prevState => ({ ...prevState, isNameValid: true }));
            } else {
                setFormErrors(prevState => ({ ...prevState, isNameValid: false }));
            }
        } else if (name === "password") {
            if (PASSWORD_PATTERN.test(value)) {
                setFormErrors(prevState => ({ ...prevState, isPasswordValid: true }));
            } else {
                setFormErrors(prevState => ({ ...prevState, isPasswordValid: false }));
            }
        }
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        if (formErrors.isNameValid && formErrors.isPasswordValid) {
            fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: values.username, password: values.password
                })
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    setValues({ ...initialState });
                })
                .catch(err => console.log(err));
        } else {
            setSubmitError(true);
        }
    }

    let userNameClass = "";
    let passwordClass = "";

    if (submitError) {
        userNameClass = " error";
        passwordClass = " error";
    } else {
        userNameClass = values.username === "" || formErrors.isNameValid ? "" : " error";
        passwordClass = values.password === "" || formErrors.isPasswordValid ? "" : " error";
    }


    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-username">Username</label>
            <input type="text"
                id="login-username"
                className={"login-form__input form-control" + userNameClass}
                name="username" 
                value={values.username}
                onChange={handleInputChange} />

            <label htmlFor="login-password">Password <a href="/login" className="label-link">Forgot password?</a></label>
            <input type="password"
                id="login-password"
                className={"login-form__input form-control" + passwordClass}
                name="password" 
                value={values.password}
                onChange={handleInputChange} />

            {userNameClass ? <span className="signup-error-message">Username may only contain alphanumeric characters and must be between 2 and 16 characters long.</span> : null}
            {passwordClass ? <span className="signup-error-message">Password must be at least 6 characters.</span> : null}

            <button type="submit" className="login-btn">Login</button>
        </form>
    );
}

export default SignIn;