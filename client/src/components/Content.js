import React, { useState, useEffect } from 'react';
import ContentMenu from './ContentMenu';
import ContentList from './ContentList';


function Content() {
    // const stringifyData = data => JSON.stringify(data, null, 2);
    // const initialData = stringifyData({ data: null });
    const [data, setData] = useState([]);
    const [hasError, setError] = useState(false);
    const [filter, setFilter] = useState([]);



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
        }

        setFilter(newContent);
    };

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
            default:
                break;
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


    useEffect(() => {
        const fetchData = () => {
            fetch("content.json")
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                    setFilter(data);
                })
                .catch(err => setError(err));
        }

        fetchData();
    }, []);


    return (
        <div className="content-list-page">
            <div className="flex-row">
                <div className="flex-col-2">
                    <ContentMenu filterContent={filterContent} sortContent={sortContent} searchContent={searchContent} />
                </div>
                <section className="flex-col-10">
                    <ContentList content={filter} />
                </section>
            </div>
        </div>
    );
}

export default Content;