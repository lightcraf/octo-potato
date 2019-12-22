import React, { Fragment } from 'react';
import './Home.scss';
import Slider from './Slider';

function Home() {
    return (
        <Fragment>
            <Slider />

            <section className="about-us">
                <div className="flex-row">
                    <div className="flex-col-12">
                        <h3 className="about-us__title">About Us</h3>
                        <p className="about-us__text">Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
                        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                        sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </section>

            <section className="service">
                <div className="flex-row">
                    <div className="flex-col-4">
                        <div className="service__wrapper">
                            <div className="service__icon service__icon--book">Book</div>
                            <h3 className="service__title">Books</h3>
                        </div>
                    </div>
                    <div className="flex-col-4">
                        <div className="service__wrapper">
                            <div className="service__icon service__icon--video">Video</div>
                            <h3 className="service__title">Video</h3>
                        </div>
                    </div>
                    <div className="flex-col-4">
                        <div className="service__wrapper">
                            <div className="service__icon service__icon--music">Music</div>
                            <h3 className="service__title">Music</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-box">
                <div className="flex-row">
                    <div className="flex-col-8">
                        <div className="map" style={{width: '100%', minHeight: '450px'}}></div>
                    </div>
                    <div className="flex-col-4">
                        <div className="company-contacts">
                            <p className="company-contacts__city">San Francisco</p>
                            <p className="company-contacts__text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. Vivamus at arcu sem.
                                Vestibulum ornare eleifendit massa, nec tempor odio. Fusce posuere nunc iaculis ligula
                                viverra iaculis. Aliquam erat volutpat.
                            </p>
                            <ul className="company-contacts__address">
                                <li>
                                    Millennium Tower, 301 Mission St, San Francisco, CA 94105, US
                                </li>
                                <li>
                                    <a href="tel:0123-456-789" rel="nofollow">0123-456-789</a>
                                </li>
                                <li>
                                    <a href="#mysite">www.yourwebsite.com</a>
                                </li>
                                <li>
                                    <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a>
                                </li>
                                <li>
                                    Monday-Friday: 9am to 6pm Saturday: 10am to 6pm Sunday: 10am to 2pm
                                </li>
                            </ul>
                            <ul className="social-links">
                                <li>
                                    <a href="#twitter" 
                                        className="social-link social-link--twitter" 
                                        target="_blank" 
                                        title="Twitter">Twitter</a>
                                </li>
                                <li>
                                    <a href="#facebook" 
                                        className="social-link social-link--facebook" 
                                        target="_blank" 
                                        title="Facebook">Facebook</a>
                                </li>
                                <li>
                                    <a href="#google-plus" 
                                        className="social-link social-link--instagram" 
                                        target="_blank" 
                                        title="Instagram">Instagram</a>
                                </li>
                                <li>
                                    <a href="#instagram" 
                                        className="social-link social-link--google" 
                                        target="_blank" 
                                        title="Google plus">Google plus</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Home;