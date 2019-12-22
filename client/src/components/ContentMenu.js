import React, { useState } from 'react';
import './ContentMenu.scss';

function ContentMenu() {
    const [hidden, setHidden] = useState([false, false]);

    function toggleFilter(i) {
        const currentItem = [...hidden];
        currentItem[i] = !currentItem[i];
        setHidden(currentItem);
    }

    return (
        <nav className="left-menu-wrapper">
            <p>Menu</p>
            <ul className="left-menu">
                <li className="left-menu__item">
                    <a href="#content" data-filter="all-content" className="left-menu__link">All content</a>
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
                            <a href="#content" className="left-menu__link">Action</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link">Drama</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link">Sci-fi</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link">Documentry</a>
                        </li>
                    </ul>
                </li>
                <li className="left-menu__item">
                    <a href="#content" 
                        className={'left-menu__link ' + (hidden[1] ? "caret-rotate" : "caret")}
                        aria-expanded="false" 
                        aria-controls="collapsible-1" onClick={() => toggleFilter(1)}>Books</a>
                </li>
                <li className="left-menu__item">
                    <ul className={hidden[1] ? "left-menu-show" : "left-menu-hide"} id="collapsible-1" aria-hidden="true">
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link">History</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link">Cookbooks</a>
                        </li>
                        <li className="left-menu__subitem">
                            <a href="#content" className="left-menu__link">Romance</a>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="search" role="search">
                <label htmlFor="search-content" className="hide-label">Search</label>
                <input type="search" id="search-content" placeholder="Search" title="Search" /><br />

                <input id="search-title" type="radio" name="search" value="title" />
                <label htmlFor="search-title"><span></span>in title</label><br />

                <input id="search-description" type="radio" name="search" value="description" />
                <label htmlFor="search-description"><span></span>in description</label><br />

                <input id="search-everywhere" type="radio" name="search" value="everywhere" defaultChecked />
                <label htmlFor="search-everywhere"><span></span>everywhere</label>
            </div>

            <div className="sort-content" role="search">
                Sort by <select className="sort-content__select">
                    <option value=""></option>
                    <option value="title">Title</option>
                    <option value="country">Countries</option>
                    <option value="price-ascending">Price: Low to High</option>
                    <option value="price-descending">Price: High to Low</option>
                </select>
            </div>
            <a href="#content" className="upload-link">Upload</a>
        </nav>
    );
}

export default ContentMenu;