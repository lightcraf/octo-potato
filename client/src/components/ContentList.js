import React from "react";
import { Link } from "react-router-dom";
import "./ContentList.scss";

function ContentList(props) {
    console.log(props.content);
    return (
        <>
            {props.content.map(item =>
                <article key={item.id} className="content__item clearfix">
                    <div className="content__poster">
                        <img src={"content-images/" + item.images.url1} className="img-responsive" alt={item.title} />
                    </div>
                    <div className="content__description-wrapper">
                        <header>
                            <h2 className="content__title">
                                <Link to={"/content/" + item.id} className="content__title-link">{item.title}</Link>
                            </h2>
                        </header>
                        <p>Genre: <span>{item.genre}</span></p>
                        <div className="rating">
                            <div className="rating__stars">
                                <div className="rating__stars-bg"></div>
                                <div className="rating__stars-current" 
                                     style={{ width: (140 * Number(item.rating.ratingValue) / 10) + "px" }}></div>
                            </div>
                            <div className="rating__value">{item.rating.ratingValue}/10</div>
                            <p className="rating__votes">Votes: <span>{item.rating.ratingCount}</span></p>
                        </div>
                        <p className="content__description">{item.description}</p>
                    </div>
                </article>
            )}
        </>
    );
}

export default ContentList;