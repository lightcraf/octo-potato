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

    const sortContent = (sortParameter) => {

    };


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
                    <ContentMenu filterContent={filterContent} sortContent={sortContent} />
                </div>
                <section className="flex-col-10">
                    <ContentList content={filter} />
                </section>
            </div>
        </div>
    );
}

export default Content;