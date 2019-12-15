import React, { Fragment, useState, useEffect } from 'react';
import './Home.scss';
import slide_1 from '../assets/slide_1.jpg';
import slide_2 from '../assets/slide_2.jpg';
import slide_3 from '../assets/slide_3.jpg';
import slide_4 from '../assets/slide_4.jpg';
import book from '../assets/open-book.png';
import video from '../assets/video.png';
import music from '../assets/musical-note.png';


function Home() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [height, setHeight] = useState(getSize);
    const images = [
        {"id": 1, "img": slide_1, "alt": "qwerty"},
        {"id": 2, "img": slide_2, "alt": "qwerty"},
        {"id": 3, "img": slide_3, "alt": "qwerty"},
        {"id": 4, "img": slide_4, "alt": "qwerty"}
    ];

    function getSize() {
        const width = document.body.clientWidth;
        // 992 - constainer width
        // 1920 x 800 - image size
        if (width < 992) {
            return Math.floor(document.body.clientWidth * 800 / 1920);
        }
        return Math.floor(992 * 800 / 1920);
    }

    const handleSlideClick = event => {
        const target = event.target;

        if (target.classList.contains("slide-prev")) {
            setSlideIndex(slideIndex - 1)
        } else if (target.classList.contains("slide-next")) {
            setSlideIndex(slideIndex + 1)
        } else if (target.classList.contains("slide-indicator")) {
            setSlideIndex(parseInt(target.getAttribute("data-slide-to")));
        }
    }

    useEffect(() => {
        if (slideIndex > 4) {
            setSlideIndex(1);
        }
        if (slideIndex < 1) {
            setSlideIndex(4);
        }
    }, [slideIndex]);
    

    useEffect(() => {
        function handleResize() {
            setHeight(getSize());
        }
 
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <Fragment>
            <div className="container">
            
                <div className="slideshow-container" onClick={(event) => handleSlideClick(event)}>
                    <div className="slides-container" style={{height: height + "px"}}>
                        {images.map((item) => (
                            <div key={item.id} className={slideIndex === item.id ? "slide active" : "slide"}>
                                <img src={item.img} alt="smartphones" />
                            </div>
                        ))}
                        <span className="slide-prev">&#10094;</span>
                        <span className="slide-next">&#10095;</span>
                    </div>
                    <div className="slide-indicators-container">
                        {images.map((item) => (
                            <div 
                                key={item.id} 
                                className={slideIndex === item.id ? "slide-indicator active" : "slide-indicator"} 
                                data-slide-to={item.id}>
                            </div>
                        ))}
                    </div>
                </div>

                <section className="about-us">
                    <div className="flex-row">
                        <div className="flex-col-12">
                            <h3 className="about-us__title">About Us</h3>
                            <p className="about-us__text">AVE Software is a client-centric team of professionals
                                with a passion for creating, enhancing, and managing
                                award-winning websites and digital experiences. As a
                                recognized global leader in development and design, our
                                proactive growth model empowers our clients to exceed their
                                goals while integrating our team with theirs. We combine
                                powerful technologies, stunning visuals, and innovative
                                strategies to tell your organization’s story while delivering
                                data-driven results.</p>
                        </div>
                    </div>
                </section>

                <section className="services">
                    <div className="flex-row">
                        <div className="flex-col-4">
                            <div className="service-wrapper">
                        
                                <h3>Dedicated Development Teams</h3>
                            </div>
                        </div>
                        <div className="flex-col-4">
                            <div className="service-wrapper">
                                <i className="fas fa-mobile-alt"></i>
                                <h3>Mobile App Development</h3>
                            </div>
                        </div>
                        <div className="flex-col-4">
                            <div className="service-wrapper">
                                <i className="fas fa-laptop"></i>
                                <h3>Enterprise Software Development</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="map-box">
                    <div className="flex-row">
                        <div className="flex-col-8">
                            <div id="map" style={{width: '100%', minHeight: '450px'}}></div>
                        </div>
                        <div className="flex-col-4">
                            <div className="company-contacts">
                                <p className="company-contacts-city">San Francisco</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. Vivamus at arcu sem.
                                    Vestibulum ornare eleifendit massa, nec tempor odio. Fusce posuere nunc iaculis ligula
                                    viverra iaculis. Aliquam erat volutpat.
                                </p>
                                <ul className="company-address-wrapper">
                                    <li>
                                        <i className="fas fa-map-marker-alt"></i> Millennium Tower, 301 Mission St, San Francisco, CA 94105, US
                                    </li>
                                    <li>
                                        <a href="tel:0123-456-789" rel="nofollow"><i className="fas fa-phone-alt"></i> 0123-456-789</a>
                                    </li>
                                    <li>
                                        <a href="#mysite"><i className="fas fa-link"></i> www.yourwebsite.com</a>
                                    </li>
                                    <li>
                                        <a href="mailto:support@yourwebsite.com"><i className="far fa-envelope"></i> support@yourwebsite.com</a>
                                    </li>
                                    <li>
                                        <i className="far fa-clock"></i> Monday-Friday: 9am to 6pm Saturday: 10am to 6pm Sunday: 10am to 2pm
                                    </li>
                                </ul>
                                <ul className="social-links">
                                    <li><a href="#twitter" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#facebook" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#google-plus" target="_blank"><i className="fab fa-google-plus-g"></i></a></li>
                                    <li><a href="#instagram" target="_blank"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Fragment>
    );
}

export default Home;