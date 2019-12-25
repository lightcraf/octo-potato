import React, { useState } from "react";
import "./ContentPage.scss";

function ContentPage(props) {
    const data = props.data;
    const [imgSrc, setImgSrc] = useState("/content-images/" + data.images.url1);

    const handleThumbsGallery = (event) => {
        if (event.target.nodeName.toUpperCase() === "IMG") {
            setImgSrc(event.target.src);
        }
    }

    return (
        <div className="content__item clearfix">
            <div className="thumbnail-wrapper">
                <div className="thumb-large">
                    <img src={imgSrc} className="thumb-large__img" alt={data.title} />
                </div>
                <ul onClick={(event) => {handleThumbsGallery(event)}}>
                    <li className="thumb-small">
                        <img src={"/content-images/" + data.images.url1} className="thumb-small__img" alt={data.title} />
                    </li>
                    <li className="thumb-small">
                        <img src={"/content-images/" + data.images.url2} className="thumb-small__img" alt={data.title} />
                    </li>
                    <li className="thumb-small">
                        <img src={"/content-images/" + data.images.url3} className="thumb-small__img" alt={data.title} />
                    </li>
                </ul>
            </div>

            <div className="content__description-wrapper">
                <header>
                    <h2 className="content__title">
                        <a href="#movie" className="content__title-link">{data.title}</a>
                    </h2>
                </header>
                <p>Genre: <span>{data.genre}</span></p>
                <div className="rating">
                    <div className="rating__stars">
                        <div className="rating__stars-bg"></div>
                        <div className="rating__stars-current"
                            style={{ width: (140 * Number(data.rating.ratingValue) / 10) + "px" }}></div>
                    </div>
                    <div className="rating__value">{data.rating.ratingValue}/10</div>
                    <p className="rating__votes">Votes: <span>{data.rating.ratingCount}</span></p>
                </div>
                <p className="content__description">{data.description}</p>
                <span>Rate this</span>
                <select className="select-rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <button className="vote-btn">Vote</button>
            </div>
        </div>
    );
}

export default ContentPage;