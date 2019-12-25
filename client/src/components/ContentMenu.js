import React, { useState, useEffect } from 'react';
import './ContentMenu.scss';

function ContentMenu(props) {
    const [hidden, setHidden] = useState([false, false]);

    function toggleFilter(i) {
        const currentItem = [...hidden];
        currentItem[i] = !currentItem[i];
        setHidden(currentItem);
    }

    function handleFilter(e) {
        const target = e.target;
        const type = target.getAttribute("data-type");
        const genre = target.getAttribute("data-genre");

        if (target.nodeName.toUpperCase() !== "A" || type === null) {
            return;
        }

        props.filterContent(type, genre);
    }

    function handleSort(e) {
        const target = e.target;

        if (target.nodeName.toUpperCase() !== "OPTION") {
            return;
        }
        console.log(e.target.value);
        props.sortContent(e.target.value);
    }

    function handleSearch(e) {
            const childNode =  e.currentTarget.childNodes; 
            let searchValue = "";
            let searchIn = "";
      
            for (let i = 0; i < childNode.length; i++) { 
                if (childNode[i].id == "search-content") {
                    searchValue = childNode[i].value;
                } else if (childNode[i].checked) {
                    searchIn = childNode[i].value;
                }
            } 
    
        props.searchContent(searchValue, searchIn);
    }

    return (
        <nav className="left-menu-wrapper" onClick={(e) => handleFilter(e)}>
            <p>Menu</p>
            <ul className="left-menu">
                <li className="left-menu__item">
                    <a href="#content" className="left-menu__link" data-type="all" data-genre="all">All content</a>
                </li>
                <li className="left-menu__item">
                    <a href="#content"
                        className={'left-menu__link ' + (hidden[0] ? "caret-rotate" : "caret")}
                        aria-expanded="false"
                        aria-controls="collapsible-0"
                        onClick={() => toggleFilter(0)}>Movies</a>
                </li>
                <li className="left-menu__item">
                    <ul className={hidden[0] ? "left-menu-show" : "left-menu-hide"} id="collapsible-0" aria-hidden="true">
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="video" data-genre="all">All</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="video" data-genre="action">Action</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="video" data-genre="drama">Drama</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="video" data-genre="sci-fi">Sci-fi</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="video" data-genre="documentry">Documentry</a>
                        </li>
                    </ul>
                </li>
                <li className="left-menu__item">
                    <a href="#content"
                        className={'left-menu__link ' + (hidden[1] ? "caret-rotate" : "caret")}
                        aria-expanded="false"
                        aria-controls="collapsible-1"
                        onClick={() => toggleFilter(1)}>Books</a>
                </li>
                <li className="left-menu__item">
                    <ul className={hidden[1] ? "left-menu-show" : "left-menu-hide"} id="collapsible-1" aria-hidden="true">
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="book" data-genre="all">All</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="book" data-genre="history">History</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="book" data-genre="cookbook">Cookbooks</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link" data-type="book" data-genre="romance">Romance</a>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="search" role="search" onChange={(e) => handleSearch(e)}>
                <label htmlFor="search-content" className="hide-label">Search</label>
                <input type="search" id="search-content" placeholder="Search" title="Search" /><br />

                <input id="search-title" type="radio" name="search-in" value="title" />
                <label htmlFor="search-title"><span></span>in title</label><br />

                <input id="search-description" type="radio" name="search-in" value="description" />
                <label htmlFor="search-description"><span></span>in description</label><br />

                <input id="search-everywhere" type="radio" name="search-in" value="everywhere" defaultChecked />
                <label htmlFor="search-everywhere"><span></span>everywhere</label>
            </div>

            <div className="sort-content" role="search">
                Sort by <select className="sort-content__select" onClick={(e) => handleSort(e)}>
                    <option value="default"></option>
                    <option value="title-asc">Title (A - Z)</option>
                    <option value="title-desc">Title (Z - A)</option>
                    <option value="rating-asc">Rating (Low > High)</option>
                    <option value="rating-desc">Rating (High > Low)</option>
                    <option value="votes-asc">Votes (Low > High)</option>
                    <option value="votes-desc">Votes (High > Low)</option>
                </select>
            </div>
            <a href="#content" className="upload-link">Upload</a>
        </nav>
    );
}

export default ContentMenu;