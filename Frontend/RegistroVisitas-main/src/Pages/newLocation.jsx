import React, { useState } from 'react';
import ReactMapGL, { GeolocateControl, Marker } from 'react-map-gl';
import { MdPlace } from 'react-icons/md';
import PropTypes from 'prop-types';

const NewLocation = ({ onAddLocation }) => {

    const [viewport, setViewport] = useState({
        latitude: 15.0000000,
        longitude: -86.5000000,
        zoom: 5,
        width: '400px',
        height: '400px'
    });

    const [markers, setMarkers] = useState({
        latitude: 0,
        longitude: 0
    });

    const handleMapClick = (e) => {
        const { lngLat } = e;
        if (lngLat) {
            const newMarker = {
                longitude: lngLat.lng,
                latitude: lngLat.lat
            };
            // setMarkers([...markers, newMarker]);
            setMarkers(newMarker);
            onAddLocation(newMarker);
        }
    };

    return (

         <div
             className="flex flex-col justify-center items-center mt-8 border border-spacing-0"
             style={{ width: '80%', height: '80%' }}>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken="pk.eyJ1IjoibW9ucm95bXVzaWM3IiwiYSI6ImNsdnN4ZjU3MTE2M3YybG1nZWF1MXd2aGMifQ.EF6-p5iVvjsepYsneON4kQ"
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(viewport) => setViewport(viewport)}
                onClick={handleMapClick}
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />

                {/* {markers.map((marker, index) => (
                    <Marker key={index} longitude={marker.longitude} latitude={marker.latitude}>
                        <MdPlace style={{ color: 'red', fontSize: 24 }} />
                    </Marker>
                ))} */}
                <Marker longitude={markers.longitude} latitude={markers.latitude}>
                    <MdPlace style={{ color: 'red', fontSize: 24 }} />
                </Marker>
            </ReactMapGL>
         </div>
    );
};

NewLocation.propTypes = {
    onAddLocation: PropTypes.func.isRequired
}

export default NewLocation;
