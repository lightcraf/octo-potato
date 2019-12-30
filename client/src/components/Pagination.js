import React, { Fragment } from "react";
import "./Pagination.scss";
// import { Link } from "react-router-dom";


function Pagination(props) {
    let startPage = 1;
    let endPage = 1;

    function setPage(page) {
        props.changePage(page);
    }

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
        return (null);
    } else {
        return (
            <Fragment>
                <ul className="pagination">
                    <li className="pagination__item">
                        {/* {props.currentPage === 1 ? null : <span className={props.currentPage === 1 ? "pagination__link pagination--disabled" : "pagination__link"}
                            onClick={() => setPage(props.currentPage - 1)}>«</span>} */}

                        <span className={props.currentPage === 1 ? "pagination__link pagination--disabled" : "pagination__link"}
                            onClick={() => setPage(props.currentPage - 1)}>«</span>
                    </li>
                    {pages.map((page, index) =>
                        <li key={index} className="pagination__item">
                            <span className={props.currentPage === page ? 'pagination__link pagination--active' : "pagination__link"}
                                onClick={() => setPage(page)}>{page}</span>
                        </li>
                    )}
                    <li className="pagination__item">
                        {/* {props.currentPage === props.totalPages ? null : <span className={props.currentPage === props.totalPages ? "pagination__link pagination--disabled" : "pagination__link"}
                            onClick={() => setPage(props.currentPage + 1)}>»</span>} */}


                        <span className={props.currentPage === props.totalPages ? "pagination__link pagination--disabled" : "pagination__link"}
                            onClick={() => setPage(props.currentPage + 1)}>»</span>
                    </li>
                </ul>
            </Fragment>
        );
    }
}

export default Pagination;