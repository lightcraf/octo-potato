import React, { useState, useEffect } from 'react';
// import './Content.scss';
import ContentMenu from './ContentMenu';
import ContentList from './ContentList';


function Content() {
    const stringifyData = data => JSON.stringify(data, null, 2);
    const initialData = stringifyData({ data: null });
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const fetchData = () => {
            fetch("content.json")
                .then(res => res.json())
                .then(results => {
                    console.log(results);
                    const name = results;
                    setData(name);
                });
        }

        fetchData();
    }, [])




    return (
        <div className="content-list-page">
            <div className="flex-row">
                <div className="flex-col-2">
                    <ContentMenu />
                </div>
                <section className="flex-col-10">
                    <ContentList value={data} />
                </section>
            </div>
        </div>
    );
}

export default Content;