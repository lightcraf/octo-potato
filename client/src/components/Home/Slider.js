import React, { useState, useEffect } from "react";
import "./Slider.scss";
import slide_1 from "../../assets/avengers.jpg";
import slide_2 from "../../assets/movies.jpg";
import slide_3 from "../../assets/prometheus.jpg";
import slide_4 from "../../assets/Lord of the rings.jpg";
import slide_5 from "../../assets/Interstellar.jpg";

function Slider() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [height, setHeight] = useState(getSize);
    const images = [
        {"id": 1, "img": slide_1, "alt": "Avengers"},
        {"id": 2, "img": slide_2, "alt": "posters"},
        {"id": 3, "img": slide_3, "alt": "Prometheus"},
        {"id": 4, "img": slide_4, "alt": "Lord of the rings"},
        {"id": 5, "img": slide_5, "alt": "Interstellar"}
    ];

    function getSize() {
        // 1920 x 1080 - image size
        return Math.floor(document.body.clientWidth * 1080 / 1920) - 10;
    }

    const handleSlideClick = event => {
        const target = event.target;

        if (target.classList.contains("slide-prev")) {
            setSlideIndex(prevIndex => prevIndex - 1);
        } else if (target.classList.contains("slide-next")) {
            setSlideIndex(prevIndex => prevIndex + 1);
        } else if (target.classList.contains("slide-indicator")) {
            setSlideIndex(parseInt(target.getAttribute("data-slide-to")));
        }
    }

    useEffect(() => {
        if (slideIndex > images.length) {
            setSlideIndex(1);
        } else if (slideIndex < 1) {
            setSlideIndex(images.length);
        }
    }, [slideIndex, images.length]);
    
    useEffect(() => {
        function handleResize() {
            setHeight(getSize());
        }
 
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="slideshow-container" onClick={handleSlideClick}>
            <div className="slides-container" style={{height: height + "px"}}>
                {images.map((item) => (
                    <div key={item.id} className={slideIndex === item.id ? "slide active" : "slide"}>
                        <img src={item.img} className="slide__img" alt={item.alt} />
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
    );
}

export default Slider;