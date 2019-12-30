import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ContentList.scss";
import Pagination from "./Pagination";

function ContentList(props) {
    const [pageList, setPageList] = useState(props.content);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 3;

    console.log(props.content);

    const changePage = (page) => {
        let startIndex = 0;
        let endIndex = 3;
        console.log("pageList******");
        console.log(pageList);
        console.log("pageList*****");

        setTotalPages(Math.ceil(props.content.length / pageSize));

        if (page < 1 || page > totalPages) {
            return;
        }

        setCurrentPage(page);

        startIndex = (currentPage - 1) * pageSize;
        endIndex = Math.min(startIndex + pageSize - 1, props.content.length - 1);

        setPageList(props.content.slice(startIndex, endIndex + 1));
    };

    useEffect(() => {
        changePage(currentPage);
    }, [props.content, currentPage]);

    useEffect(() => {
        const handleProps = () => {
            setPageList(props.content.slice(0, pageSize));
            setCurrentPage(1);
        };

        handleProps();

        return () => {
            handleProps();
        }
    }, [props.content]);

    if (pageList.length === 0) {
        return (<p>No search results found</p>);
    } else {
        return (
            <>
                {pageList.map(item =>
                    <article key={item.id} className="content__item clearfix">
                        <div className="content__poster">
                            <img src={"content-images/" + item.images.url1} className="img-responsive" alt={item.title} />
                        </div>
                        <div className="content__description-wrapper">
                            <header>
                                <h2 className="content__title">
                                    {/* <Link to={`${url}/${item.id}`} className="content__title-link">{item.title}</Link> */}
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
                <Pagination
                    currentPage={currentPage}
                    changePage={changePage}
                    totalPages={totalPages} />
            </>
        );
    }
}

export default ContentList;