import React, { useState, useEffect, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import ContentMenu from "./ContentMenu";
import ContentList from "./ContentList";
import ContentPage from "./ContentPage";
import NoMatch from "./NoMatch";

function Content() {
    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);

    const filterContent = (type, genre) => {
        let newContent = null;
        if (type === "all" && genre === "all") {
            setFilter(data);
        } else if (genre === "all") {
            newContent = data.filter(item => {
                return (item.type === type);
            });
            setFilter(newContent);
        } else {
            newContent = data.filter(item => {
                return (item.type === type && item.genre === genre);
            });
            setFilter(newContent);
        }
    }

    const sortContent = (optionValue) => {
        let newContent = [...filter];
        const sortParameter = optionValue.split("-")[0];
        const order = optionValue.split("-")[1] === "asc" ? 1 : -1;

        switch (sortParameter) {
            case "title":
                newContent = newContent.sort(compareValues("title", order));
                break;
            case "rating":
                newContent = newContent.sort(compareValues("rating", order));
                break;
            case "votes":
                newContent = newContent.sort(compareValues("rating_count", order));
                break;
            default: break;
        }

        setFilter(newContent);
    };

    function compareValues(propertyName, order) {
        return function (object1, object2) {
            const value1 = (typeof object1[propertyName] === "string") ? object1[propertyName].toLowerCase() : object1[propertyName];
            const value2 = (typeof object2[propertyName] === "string") ? object2[propertyName].toLowerCase() : object2[propertyName];

            if (value1 < value2) {
                return -1 * order;
            } else if (value1 > value2) {
                return 1 * order;
            } else {
                return 0;
            }
        };
    }

    const searchContent = (searchValue, searchIn) => {
        let newContent = [];
        switch (searchIn) {
            case "everywhere":
                newContent = data.filter(item => {
                    return item.title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue);
                });
                break;
            case "description":
                newContent = data.filter(item => {
                    return item.description.toLowerCase().includes(searchValue);
                });
                break;
            case "title":
                newContent = data.filter(item => {
                    return item.title.toLowerCase().includes(searchValue);
                });
                break;
            default: break;
        }

        setFilter(newContent);
    };

    useEffect(() => {
        const fetchData = () => {
            setError(false);
            setLoading(true);
            fetch("/api/content")
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                    setData(data);
                    setFilter(data);
                })
                .catch(err => setError(true));
        };

        fetchData();
    }, []);

    return (
        <div className="content-page">
            <Switch>
                {data.map((item, index) =>
                    <Route key={item.id} exact path={"/content/" + item.id}>
                        <ContentPage data={data[index]} />
                    </Route>
                )}
                
                <Route exact path={"/content"}>
                    <Fragment>
                        <ContentMenu
                            filterContent={filterContent}
                            sortContent={sortContent}
                            searchContent={searchContent} />

                        <section className="content-list">
                            {hasError && <p>Something went wrong ...</p>}
                            {loading ? <div className="spinner"></div> : <ContentList content={filter} />}
                        </section>
                    </Fragment>
                </Route>
                <Route path="/content/*">
                    <NoMatch />
                </Route>
            </Switch>
        </div>
    );
}

export default Content;