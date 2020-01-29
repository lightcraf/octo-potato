import React, { useState, useEffect, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ContentList.scss";
import Pagination from "./Pagination";

function ContentList(props) {
    const location = useLocation();
    const [pageList, setPageList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 3;

    useEffect(() => {
        document.title = "Content";
    }, []);

    useEffect(() => {
        let page = 1;

        if (location.hash !== "") {
            page = Math.floor(Number(location.hash.split("#page")[1]));
        }

        if (page < 1) {
            page = 1;
        }

        let startIndex = (page - 1) * pageSize;
        let endIndex = startIndex + pageSize;

        setPageList(props.content.slice(startIndex, endIndex));
        setCurrentPage(page);
    }, [props.content, location.hash]);

    useEffect(() => {
        window.location.hash = "";
        setTotalPages(Math.ceil(props.content.length / pageSize));
    }, [props.content]);

    if (pageList.length === 0) {
        return <p>Nothing here matches your search</p>;
    } else {
        return (
            <Fragment>
                {pageList.map(item =>
                    <article key={item.id} className="content__item">
                        <div className="content__poster">
                            <img src={"/content-images/" + item.poster} alt={item.title} />
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
                                        style={{ width: (139 * item.rating / 10).toFixed() + "px" }}></div>
                                </div>
                                <div className="rating__value">{item.rating}/10</div>
                                <p className="rating__votes">Votes: <span>{item.rating_count}</span></p>
                            </div>
                            <p className="content__description">{item.description}</p>
                        </div>
                    </article>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages} />
            </Fragment>
        );
    }
}

export default ContentList;