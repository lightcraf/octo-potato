import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import UserGreeting from "./UserGreeting";
import "./Header.scss";
import logo from "../assets/logo.png";

function Header(props) {
    const [isNavHidden, setIsNavHidden] = useState(true);

    const toggleNav = () => {
        setIsNavHidden((prevState) => !prevState);
    }

    return (
        <header className="header">
            <nav className="top-nav">
                <h1 className="logo">
                    <Link to="/"><img src={logo} className="logo__img" alt="site logo" /></Link>
                </h1>
                <div className="toggle-nav" aria-expanded="false" aria-controls="collapsible-3" onClick={toggleNav}>
                    <span>Toggle navigation</span>
                </div>
                <ul className={"top-nav__list" + (isNavHidden ? "" : " active")} id="collapsible-3" aria-hidden="true">
                    <li className="top-nav__item">
                        <Link to="/" className="top-nav__link">Home</Link>
                    </li>
                    <li className="top-nav__item dropdown">
                        <Link to="/content" className="top-nav__link caret-nav" aria-haspopup="true">Content</Link>
                        <div className="dropdown__box" aria-label="submenu">
                            <a href="/" className="dropdown__link">Movies</a>
                            <a href="/" className="dropdown__link">Books</a>
                            <a href="/" className="dropdown__link">Coming soon</a>
                            <a href="/" className="dropdown__link">Most popular</a>
                        </div>
                    </li>
                    <li className="top-nav__item">
                        <Link to="/" className="top-nav__link">Forum</Link>
                    </li>
                    <li className="top-nav__item">
                        <a href="/#contact" className="top-nav__link">Contact</a>
                    </li>
                    {props.isLoggedIn ? <UserGreeting {...props} /> : (
                        <Fragment>
                            <li className="top-nav__item">
                                <Link to="/signin" className="top-nav__link">Sign In</Link>
                            </li>
                            <li className="top-nav__item">
                                <Link to="/signup" className="top-nav__link">Sign Up</Link>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;