import React, { useState } from "react";
import "./ContentMenu.scss";

function ContentMenu(props) {
    const [isFilterHidden, setIsFilterHidden] = useState([true, true]);
    const [isMenuHidden, setIsMenuHidden] = useState(true);

    function toggleMenu() {
        setIsMenuHidden((prevState) => !prevState);
    }

    function toggleFilter(i) {
        const currentItem = [...isFilterHidden];
        currentItem[i] = !currentItem[i];
        setIsFilterHidden(currentItem);
    }

    function handleFilter(event) {
        const target = event.target;
        const type = target.getAttribute("data-type");
        const genre = target.getAttribute("data-genre");

        if (target.nodeName.toUpperCase() !== "SPAN" || type === null) {
            return;
        }

        props.filterContent(type, genre);
    }

    function handleSort(event) {
        const target = event.target;

        if (target.nodeName.toUpperCase() !== "OPTION") {
            return;
        }

        props.sortContent(event.target.value);
    }

    function handleSearch(event) {
            const childNode =  event.currentTarget.childNodes; 
            let searchValue = "";
            let searchIn = "";
      
            for (let i = 0; i < childNode.length; i++) { 
                if (childNode[i].id === "search-content") {
                    if (childNode[i].value.trim() === "") {
                        return;
                    }
                    searchValue = childNode[i].value.trim();
                } else if (childNode[i].checked) {
                    searchIn = childNode[i].value;
                }
            } 
    
        props.searchContent(searchValue, searchIn);
    }

    return (
        <aside className={"left-menu-wrapper" + (isMenuHidden ? "" : " active")} onClick={handleFilter}>
            <h3 className="left-menu__title">Menu</h3>
            <h3 className="left-menu__title toggle-left-menu" onClick={toggleMenu}>Menu</h3>
            <ul className="left-menu">
                <li className="left-menu__item">
                    <span className="left-menu__link" data-type="all" data-genre="all">All content</span>
                </li>
                <li className="left-menu__item">
                    <span
                        className={"left-menu__link " + (isFilterHidden[0] ? "caret" : "caret-rotate")}
                        aria-expanded="false"
                        aria-controls="collapsible-0"
                        onClick={() => toggleFilter(0)}>Movies</span>
                </li>
                <li className="left-menu__item">
                    <ul className={isFilterHidden[0] ? "left-menu-hide" : "left-menu-show"} id="collapsible-0" aria-hidden="true">
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="video" data-genre="all">All</span>
                        </li>
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="video" data-genre="action">Action</span>
                        </li>
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="video" data-genre="drama">Drama</span>
                        </li>
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="video" data-genre="sci-fi">Sci-fi</span>
                        </li>
                    </ul>
                </li>
                <li className="left-menu__item">
                    <span 
                        className={"left-menu__link " + (isFilterHidden[1] ? "caret" : "caret-rotate")}
                        aria-expanded="false"
                        aria-controls="collapsible-1"
                        onClick={() => toggleFilter(1)}>Books</span>
                </li>
                <li className="left-menu__item">
                    <ul className={isFilterHidden[1] ? "left-menu-hide" : "left-menu-show"} id="collapsible-1" aria-hidden="true">
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="book" data-genre="all">All</span>
                        </li>
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="book" data-genre="cookbook">Cookbooks</span>
                        </li>
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="book" data-genre="romance">Romance</span>
                        </li>
                        <li className="left-menu__subitem">
                            <span className="left-menu__link" data-type="book" data-genre="science">Science</span>
                        </li>
                    </ul>
                </li>
            </ul>

            <div className="search" role="search" onKeyUp={handleSearch}>
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
                <p>Sort by</p>
                <select className="sort-content__select" defaultValue={"default"} onClick={handleSort}>
                    <option value="default" disabled hidden></option>
                    <option value="title-asc">Title (A - Z)</option>
                    <option value="title-desc">Title (Z - A)</option>
                    <option value="rating-asc">Rating (Low > High)</option>
                    <option value="rating-desc">Rating (High > Low)</option>
                    <option value="votes-asc">Votes (Low > High)</option>
                    <option value="votes-desc">Votes (High > Low)</option>
                </select>
            </div>
            <a href="/add" className="add-content-link">Add new</a>
        </aside>
    );
}

export default ContentMenu;