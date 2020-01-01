import React, { useState, useEffect } from "react";
import ContentMenu from "./ContentMenu";
import ContentList from "./ContentList";
import ContentPage from "./ContentPage";
import { Switch, Route } from "react-router-dom";


function Content() {
    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [filter, setFilter] = useState([]);
    const [isLoaded, setLoad] = useState(false);
    const [loading, setLoading] = useState(false);

    const filterContent = (type, genre) => {
        let newContent = null;
        if (type === "all" && genre === "all") {
            setFilter(data);
        } else if (genre === "all") {
            newContent = data.filter(i => {
                return (i.type === type);
            });
            setFilter(newContent);
        } else {
            newContent = data.filter(i => {
                return (i.type === type && i.genre === genre);
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
                newContent = newContent.sort(compareValues("title", null, order));
                break;
            case "rating":
                newContent = newContent.sort(compareValues("rating", "ratingValue", order));
                break;
            case "votes":
                newContent = newContent.sort(compareValues("rating", "ratingCount", order));
                break;
            default: break;
        }

        setFilter(newContent);
    };

    function compareValues(prop, nestedProp, order) {
        return function (object1, object2) {
            const propValue1 = nestedProp ? object1[prop][nestedProp] : object1[prop];
            const propValue2 = nestedProp ? object2[prop][nestedProp] : object2[prop];
            const value1 = (typeof propValue1 === "string" && isNaN(propValue2)) ? propValue1.toUpperCase() : Number(propValue1);
            const value2 = (typeof propValue2 === "string" && isNaN(propValue2)) ? propValue2.toUpperCase() : Number(propValue2);

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
        console.log(searchValue, searchIn);

        const newContent = [];
        switch (searchIn) {
            case "everywhere":
                data.forEach((item) => {
                    if (item.title.toLowerCase().toString().indexOf(searchValue) !== -1 || item.description.toLowerCase().toString().indexOf(searchValue) !== -1) {
                        newContent.push(item);
                    }
                });
                break;
            case "description":
                data.forEach((item) => {
                    if (item.description.toLowerCase().toString().indexOf(searchValue) !== -1) {
                        newContent.push(item);
                    }
                });
                break;
            case "title":
                data.forEach((item) => {
                    if (item.title.toLowerCase().toString().indexOf(searchValue) !== -1) {
                        newContent.push(item);
                    }
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
                    console.log(data);
                    setData(data);
                    setFilter(data);
                    setLoad(true);
                })
                .catch(err => setError(true));
        };

        fetchData();
    }, []);

  
    return (
        <div className="content-list-page">
        <Switch>
            {/* {isLoaded ? data.map(item => 
                <Route key={item.id} exact path={"/content/" + item.id}>
                    {console.log(item.id)}
                    <ContentPage data={data[item.id]} /> 
                </Route>
            ) : null} */}

            {data.map((item, index) => 
                <Route key={item.id} exact path={"/content/" + item.id}>
                    <ContentPage data={data[index]} /> 
                </Route>
            )}

            <Route exact path={"/content"}>
                <div className="flex-row">
                    <div className="flex-col-2">
                        <ContentMenu 
                            filterContent={filterContent} 
                            sortContent={sortContent} 
                            searchContent={searchContent} />
                    </div>
                    <section className="flex-col-10">
                        {hasError && <p>Something went wrong ...</p>}
                        {loading ? <div className="spinner"></div> : <ContentList content={filter} />}
                    </section>
                </div>
            </Route>
        </Switch>



            {/* <div className="flex-row">
                <div className="flex-col-2">
                    <ContentMenu 
                        filterContent={filterContent} 
                        sortContent={sortContent} 
                        searchContent={searchContent} />
                </div>
                <section className="flex-col-10">
                    {filter.length === 0 ? <p>No search results found</p> : null}
                    <ContentList content={filter} />
                </section>
            </div> */}

            {/* {isLoaded ? <ContentPage data={data[3]} /> : null} */}
        </div>
    );
}

export default Content;