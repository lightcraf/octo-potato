import React, {useState} from 'react';
import './Header.scss';
import logo from '../assets/logo.png';


function Header() {
    const [showNav, setToggleNav] = useState(false);

    const toggleNav = () => {
        setToggleNav(!showNav);
    }
   
    return (
        <header className="header">
            <nav className="top-nav">
                <h1 className="logo">
                    <a href="/"><img src={logo} className="logo__img" alt="site logo" /></a>
                </h1>
                <div className="toggle-nav" onClick={toggleNav}>
                    <span>Toggle navigation</span>
                </div>
                <ul className={showNav ? "top-nav__list active" : "top-nav__list"}>
                    <li className="top-nav__item"><a href="/" className="top-nav__link">Home</a></li>
                    <li className="top-nav__item dropdown">
                        <a href="/tours" className="top-nav__link caret-nav" aria-haspopup="true">Tours</a>
                        <div className="dropdown__box" aria-label="submenu">
                            <a href="/request" className="dropdown__link">Tour Request</a>
                            <a href="#special-offers" className="dropdown__link">Special Offers</a>
                            <a href="#destination-guides" className="dropdown__link">Destination</a>
                            <a href="#popular-tours" className="dropdown__link">Popular Tours</a>
                        </div>
                    </li>
                    <li className="top-nav__item">
                        <a href="/services" className="top-nav__link">Services</a>
                    </li>
                    <li className="top-nav__item">
                        <a href="/contact" className="top-nav__link">Contact</a>
                    </li>
                    <li className="top-nav__item">
                        <a href="#signin" className="top-nav__link">Sign In</a>
                    </li>
                    <li className="top-nav__item">
                        <a href="#signup" className="top-nav__link">Sign Up</a>
                    </li>
                    {/* <LoginControl isLoggedIn={this.state.cookie} />
        <UserGreeting isLoggedIn={this.state.cookie} /> */}
                </ul>
            </nav>
        </header>
    );
}

export default Header;