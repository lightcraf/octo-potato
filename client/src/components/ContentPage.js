import React, { useState } from "react";
import "./ContentPage.scss";

function ContentPage(props) {
    const [imgSrc, setImgSrc] = useState("");
    const [rating, setRating] = useState("");
    const [voted, setVoted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(props.data);

    const handleThumbsGallery = (event) => {
        const target = event.target;
        if (target.nodeName.toUpperCase() === "IMG" && target.className === "thumb-small__img") {
            setImgSrc(target.src);
        }
    };

    const handleRatingChange = (event) => {
        let value = Math.floor(Number(event.target.value));

        if (isNaN(Number(value))) {
            return;
        } else if (value < 1) {
            value = 1;
        } else if (value > 10) {
            value = 10;
        }

        setRating(value);
    };

    const submitRating = (event) => {
        event.preventDefault();
        if (rating !== "") {
            fetchData();
            setRating("");
        } else {
            setIsError(true);
            return;
        }
    }

    const fetchData = () => {
        setIsError(false);
        fetch("/api/content/" + data.id, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rating: rating
            })
          })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.voteError === true) {
                    setIsError(true)
                } else {
                    setVoted(true);
                    setData( prevState => ({ ...prevState, rating_count : result.ratingCount, rating_sum : result.ratingSum }));
                }
            })
            .catch(err => setIsError(true));
    };

    return (
        <div className="content__item clearfix">
            <div className="thumbnail-wrapper">
                <div className="thumb-large">
                    <img src={imgSrc || "/content-images/" + data.poster} className="thumb-large__img" alt={data.title} />
                </div>
                <ul onClick={handleThumbsGallery}>
                    <li className="thumb-small">
                        <img src={"/content-images/" + data.poster} className="thumb-small__img" alt={data.title} />
                    </li>
                    <li className="thumb-small">
                        <img src={"/content-images/" + data.image_1} className="thumb-small__img" alt={data.title} />
                    </li>
                    <li className="thumb-small">
                        <img src={"/content-images/" + data.image_2} className="thumb-small__img" alt={data.title} />
                    </li>
                </ul>
            </div>

            <div className="content__description-wrapper">
                <header>
                    <h2 className="content__title">
                        {data.title}
                    </h2>
                </header>
                <p>Genre: <span>{data.genre}</span></p>
                <div className="rating">
                    <div className="rating__stars">
                        <div className="rating__stars-bg"></div>
                        <div className="rating__stars-current"
                            style={{ width: (139 * (data.rating_sum/data.rating_count) / 10).toFixed() + "px" }}></div>
                    </div>
                    <div className="rating__value">{(data.rating_sum/data.rating_count).toFixed(1)}/10</div>
                    <p className="rating__votes">Votes: <span>{data.rating_count}</span></p>
                </div>
                <p className="content__description">{data.description}</p>
                <form onSubmit={submitRating}>
                    <span>Rate this</span>
                    <select value={rating} className="select-rating" onChange={handleRatingChange}>
                        <option value="" disabled hidden></option>
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
                    <button type="submit" className="vote-btn" disabled={voted}>Vote</button>
                </form>
                {isError ? <p className="vote-message--error">Something went wrong ...</p> : null}
                {voted ? <p className="vote-message--success">Thanks! We got your vote.</p> : null}
            </div>
        </div>
    );
}

export default ContentPage;