import React, { useState, useEffect } from "react";
import "./Slider.scss";
import slide_1 from "../assets/avengers.jpg";
import slide_2 from "../assets/aaa.jpg";
import slide_3 from "../assets/1267865.jpg";
import slide_4 from "../assets/Interstellar.jpg";

function Slider() {
    const [slideIndex, setSlideIndex] = useState(1);
    const [height, setHeight] = useState(getSize);
    const images = [
        {"id": 1, "img": slide_1, "alt": "qwerty"},
        {"id": 2, "img": slide_2, "alt": "qwerty"},
        {"id": 3, "img": slide_3, "alt": "qwerty"},
        {"id": 4, "img": slide_4, "alt": "qwerty"}
    ];

    function getSize() {
        // 1920 x 1080 - image size
        return Math.floor(document.body.clientWidth * 1080 / 1920) - 10;
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
 
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="slideshow-container" onClick={(event) => handleSlideClick(event)}>
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