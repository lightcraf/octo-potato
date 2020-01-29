import React, { useState, useEffect, useRef } from "react";

function Map() {
    const [offlineMap, setOfflineMap] = useState(true);
    const mapEl = useRef();

    useEffect(() => {
        const OFFICE = { lat: 37.790417, lng: -122.396193 };

        try {
            const map = new window.google.maps.Map(mapEl.current, {
                center: OFFICE,
                zoom: 16,
                scrollwheel: false
            });
            new window.google.maps.Marker({
                position: OFFICE,
                map: map
            });
        } catch (error) {
            setOfflineMap(true);
        }

    }, []);

    const mapStyle = {
        width: "100%",
        minHeight: "450px"
    };

    if (offlineMap) {
        return <div className="map" style={mapStyle}></div>;
    } else {
        return <div ref={mapEl} style={mapStyle}></div>;
    }
}

export default Map;