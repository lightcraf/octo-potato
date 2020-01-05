import React, { useState } from "react";

function SignUp() {
    const initialState = {
        username: "",
        email: "",
        password: ""
    };
    const [values, setValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({ 
        isNameValid: false, 
        isEmailValid: false, 
        isPasswordValid: false 
    });
    const [submitError, setSubmitError] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const EMAIL_PATTERN = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        const USERNAME_PATTERN = /^[a-zA-Z0-9]{2,16}$/;
        const PASSWORD_PATTERN = /^.{6,}$/;

        setValues({ ...values, [name]: value });
        setSubmitError(false);

        if (name === "username") {
            if (USERNAME_PATTERN.test(value)) {
                setFormErrors(prevState => ({ ...prevState, isNameValid: true }));
            } else {
                setFormErrors(prevState => ({ ...prevState, isNameValid: false }));
            }
        } else if (name === "email") {
            if (EMAIL_PATTERN.test(value)) {
                setFormErrors(prevState => ({ ...prevState, isEmailValid: true }));
            } else {
                setFormErrors(prevState => ({ ...prevState, isEmailValid: false }));
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

        if (formErrors.isNameValid && formErrors.isEmailValid && formErrors.isPasswordValid) {
            fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: values.username, email: values.email, password: values.password
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
    let emailClass = "";
    let passwordClass = "";

    if (submitError) {
        userNameClass = " error";
        emailClass = " error";
        passwordClass = " error";
    } else {
        userNameClass = values.username === "" || formErrors.isNameValid ? "" : " error";
        passwordClass = values.password === "" || formErrors.isPasswordValid ? "" : " error";
        emailClass = values.email === "" || formErrors.isEmailValid ? "" : " error";
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-username">Name</label>
            <input type="text"
                id="signup-username"
                className={"login-form__input form-control" + userNameClass}
                name="username"
                value={values.username}
                onChange={handleInputChange} />

            <label htmlFor="signup-email">Email</label>
            <input type="email"
                id="signup-email"
                className={"login-form__input form-control" + emailClass}
                name="email"
                value={values.email}
                onChange={handleInputChange} />

            <label htmlFor="signup-password">Password</label>
            <input type="password"
                id="signup-password"
                className={"login-form__input form-control" + passwordClass}
                name="password"
                value={values.password}
                onChange={handleInputChange} />

            {userNameClass ? <span className="signup-error-message">Username may only contain alphanumeric characters and must be between 2 and 16 characters long.</span> : null}
            {emailClass ? <span className="signup-error-message">Invalid email.</span> : null}
            {passwordClass ? <span className="signup-error-message">Password must be at least 6 characters.</span> : null}
            <span className="form-privacy">
                By creating an account you agree to our <a href="/" className="form-privacy-link">Terms & Privacy</a>.
            </span>

            <button type="submit" className="login-btn">Sign Up</button>
        </form>
    );
}

export default SignUp;