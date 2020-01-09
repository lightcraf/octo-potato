import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Pagination.scss";

function Pagination(props) {
    let startPage = 1;
    let endPage = 1;

    if (props.totalPages <= 5) {
        startPage = 1;
        endPage = props.totalPages;
    } else {
        if (props.currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (props.currentPage + 2 >= props.totalPages) {
            startPage = props.totalPages - 4;
            endPage = props.totalPages;
        } else {
            startPage = props.currentPage - 2;
            endPage = props.currentPage + 2;
        }
    }

    const pages = ((startPage, endPage) => {
        const arr = [];
        for (let i = startPage; i < endPage; i++) {
            arr.push(i);
        }
        return arr;
    })(startPage, endPage + 1);

    if (pages.length < 2) {
        return null;
    } else {
        return (
            <Fragment>
                <ul className="pagination">
                    <li className="pagination__item">
                        {props.currentPage === 1 ? null : (
                            <Link to={"#page" + (props.currentPage - 1)}
                                className={props.currentPage === 1 ? "pagination__link pagination--active" : "pagination__link"}>«
                            </Link>)}
                    </li>
                    {pages.map((page, index) =>
                        <li key={index} className="pagination__item">
                            <Link to={"#page" + page}
                                className={props.currentPage === page ? "pagination__link pagination--active" : "pagination__link"}>{page}
                            </Link>
                        </li>
                    )}
                    <li className="pagination__item">
                        {props.currentPage === props.totalPages ? null : (
                            <Link to={"#page" + (props.currentPage + 1)}
                                className={props.currentPage === props.totalPages ? "pagination__link pagination--active" : "pagination__link"}>»
                            </Link>)}
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default Pagination;