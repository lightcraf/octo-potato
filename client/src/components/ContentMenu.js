import React, { useState } from 'react';
import './ContentMenu.scss';
import ContentList from './ContentList';

function ContentMenu() {
    const [activeFilterList, setFilterList] = useState(false);

    const toggleFilterList = () => {
        setFilterList(!activeFilterList);
    }


    return (
        <div className="content-list-page">
            <div className="flex-row">
                <div className="flex-col-2">
                    <nav className="left-menu-wrapper">
                        <p>Menu</p>
                        <ul className="left-menu">
                            <li className="left-menu__item">
                                <a href="#content" data-filter="all-content" className="left-menu__link">All content</a>
                            </li>
                            <li className="left-menu__item">
                                <a href="#content" 
                                   id="js-show-countries"
                                   className="left-menu__link caret"
                                   aria-expanded="false" 
                                   aria-controls="collapsible-0" onClick={toggleFilterList}>Movies</a>
                            </li>
                            <li className="left-menu__item">
                                <ul className={activeFilterList ? "left-menu-show" : "left-menu-hide"} id="collapsible-0" aria-hidden="true">
                                    <li><a href="#content" className="left-menu__link">Denmark</a></li>
                                    <li><a href="#content" className="left-menu__link">England</a></li>
                                    <li><a href="#content" className="left-menu__link">Estonia</a></li>
                                    <li><a href="#content" className="left-menu__link">Finland</a></li>
                                </ul>
                            </li>
                            <li className="left-menu__item">
                                <a href="#content" 
                                   id="js-show-tour-type"
                                   className="left-menu__link caret"
                                   aria-expanded="false" 
                                   aria-controls="collapsible-1" onClick={toggleFilterList}>Books</a>
                            </li>
                            <li className="left-menu__item">
                                <ul className={activeFilterList ? "left-menu-show" : "left-menu-hide"} id="collapsible-1" aria-hidden="true">
                                    <li><a href="#content" className="left-menu__link">Wildlife Tours</a></li>
                                    <li><a href="#content" className="left-menu__link">Food and Wine Tours</a></li>
                                    <li><a href="#content" className="left-menu__link">Luxury Tours</a></li>
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

                        <div className="sort" role="search">
                            Sort by <select>
                                <option value=""></option>
                                <option value="title">Title</option>
                                <option value="country">Countries</option>
                                <option value="price-ascending">Price: Low to High</option>
                                <option value="price-descending">Price: High to Low</option>
                            </select>
                        </div>
                        <a href="#content" className="upload-link">Upload</a>
                    </nav>
                </div>
                <ContentList />
            </div>
        </div>
    );
}

export default ContentMenu;