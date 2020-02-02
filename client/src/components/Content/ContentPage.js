import React, { useState, useEffect } from "react";
import "./ContentPage.scss";
import useUserStatus from "../useUserStatus";

function ContentPage(props) {
    const [imgSrc, setImgSrc] = useState("");
    const [rating, setRating] = useState("");
    const [voted, setVoted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(props.data);
    const [userRating, setUserRating] = useState(0);
    const [warningMessage, setWarningMessage] = useState(false);
    const { isLoggedIn } = useUserStatus();

    useEffect(() => {
        document.title = data.title;
    }, [data.title]);

    const handleThumbsGallery = event => {
        const target = event.target;
        if (target.nodeName.toUpperCase() === "IMG" && target.className === "thumb-small__img") {
            setImgSrc(target.src);
        }
    };

    const handleRatingChange = event => {
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

    const submitRating = event => {
        event.preventDefault();

        if (rating === "") {
            return;
        }

        if (!isLoggedIn) {
            setWarningMessage(true);
            return;
        }

        if (userRating !== 0 && isLoggedIn) {
            return;
        } else if (userRating === 0 && isLoggedIn && rating !== "") {
            postRating();
            setRating("");
        } else {
            setIsError(true);
            return;
        }
    }

    useEffect(() => {
        const getRating = () => {
            fetch("/api/content/" + data.id)
                .then(res => res.json())
                .then(data => {
                    if (data.voteError === true) {
                        setIsError(true)
                    }
                    setUserRating(data.rating);
                })
                .catch(err => setIsError(true));
        };

        if (isLoggedIn) {
            getRating();
        }
    }, [isLoggedIn, data.id]);

    const postRating = () => {
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
            .then(data => {
                if (data.voteError === true) {
                    setIsError(true)
                } else {
                    setVoted(true);
                    setData(prevState => ({ ...prevState, rating_count: data.ratingCount, rating: data.rating }));
                }
            })
            .catch(err => setIsError(true));
    };

    return (
        <div className="content__item">
            <div className="thumbnail-wrapper">
                <div className="thumb-large">
                    <img src={imgSrc || "/content-images/" + data.poster} className="thumb-large__img" alt={data.title} />
                </div>
                <ul className="thumb-small" onClick={handleThumbsGallery}>
                    <li className="thumb-small__item">
                        <img src={"/content-images/" + data.poster} className="thumb-small__img" alt={data.title} />
                    </li>
                    <li className="thumb-small__item">
                        <img src={"/content-images/" + data.image_1} className="thumb-small__img" alt={data.title} />
                    </li>
                    <li className="thumb-small__item">
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
                            style={{ width: (139 * data.rating / 10).toFixed() + "px" }}></div>
                    </div>
                    <div className="rating__value">{data.rating}/10</div>
                    <p className="rating__votes">Votes: <span>{data.rating_count}</span></p>
                </div>
                <p className="content__description">{data.description}</p>
                
                {userRating === 0 ? 
                    <form onSubmit={submitRating}>
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
                        <button type="submit" className="vote-btn" disabled={voted}>Click to rate</button>
                    </form> : null}

                {isError ? <p className="vote-message--error">Something went wrong ...</p> : null}
                {voted ? <p className="vote-message--success">Thanks! We got your vote.</p> : null}

                {warningMessage ? <p>Please sign in to rate this content.</p> : null}
                {userRating !== 0 && isLoggedIn ? <p>You have already rated this content. You have given {userRating} stars.</p> : null}
            </div>
        </div>
    );
}

export default ContentPage;