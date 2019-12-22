import React from 'react';
import './ContentList.scss';
import img1 from '../assets/content-images/poster.jpg';

function ContentList() {
    const content = [
        { "id": 1, "poster": img1, "title": "Interstellar (2014)", "genre": "sci-fi", "shortDescription": "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage." },
        { "id": 2, "poster": img1, "title": "Interstellar (2014)", "genre": "sci-fi", "shortDescription": "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage." },
        { "id": 3, "poster": img1, "title": "Interstellar (2014)", "genre": "sci-fi", "shortDescription": "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage." },
        { "id": 4, "poster": img1, "title": "Interstellar (2014)", "genre": "sci-fi", "shortDescription": "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage." }
    ];


    return (
        <section className="flex-col-10">
            {content.map(item =>
                <article key={item.id} className="content__item clearfix">
                    <div className="content__poster">
                        <img src={item.poster} className="img-responsive" alt={item.title} />
                    </div>
                    <div className="content__description-wrapper">
                        <header>
                            <h2 className="content__title">
                                <a href="#movie" className="content__title-link">{item.title}</a>
                            </h2>
                        </header>
                        <p>Genre: <span className="aqua">{item.genre}</span></p>
                        <div className="rating">
                            <div className="rating__stars">
                                <div className="rating__stars-bg"></div>
                                <div className="rating__stars-current" style={{ width: "133px" }}></div>
                            </div>
                            <div className="rating__value">9.5/10</div>
                            <p className="rating__votes">Votes: <span>12</span></p>
                        </div>
                        <p className="content__description">{item.shortDescription}</p>
                    </div>
                </article>
            )}
        </section>
    );
}

export default ContentList;