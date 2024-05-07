import { useEffect, useState } from 'react';
import Map, { GeolocateControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL from 'react-map-gl';

const PruebaMap = () => {

    const [newPlace, setNewPlace] = useState(null);
    const [viewport, setViewPort] = useState({
        latitude: 15.0000000,
        longitude: -86.5000000,
        zoom: 5,
        width: window,
        height: window.innerHeight
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => { 

        })
    });

    const handleClick = (e) => {
        const [longitude, latitude] = e.lngLat;
        setNewPlace({
            lat: latitude,
            long: longitude
        });
    }

    console.log(newPlace);

    return (
        <div
            style={{ width: '100vw', height: '100vh', xIndex: 999 }}
            className='bg-slate-400'>
            {/* {viewport.latitude && viewport.longitude && (
            <div className='w-full h-full '>
            <Map
                mapboxAccessToken="pk.eyJ1IjoibW9ucm95bXVzaWM3IiwiYSI6ImNsdnN4ZjU3MTE2M3YybG1nZWF1MXd2aGMifQ.EF6-p5iVvjsepYsneON4kQ"
                initialViewState={{
    
                }}
                // mapStyle="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css"
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker
                    longitude={viewport.longitude}
                    latitude={viewport.latitude}
                />

            </Map>

            </div>
            )}
             */}

            <ReactMapGL
                {...viewport}
                mapboxAccessToken="pk.eyJ1IjoibW9ucm95bXVzaWM3IiwiYSI6ImNsdnN4ZjU3MTE2M3YybG1nZWF1MXd2aGMifQ.EF6-p5iVvjsepYsneON4kQ"
                width="500px"
                height="500px"
                borderRadius="15px"
                border="2px solid red"
                transitionDuration='100'
                mapStyle="mapbox://styles/mapbox/streets-v11"


                onViewportChange={(viewport) => setViewPort(viewport)}
                onDblClick={handleClick}
            >
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                />

                {newPlace ? (
                    <>
                        <Marker
                            latitude={newPlace?.lat}
                            longitude={newPlace?.long}

                            offseftleft={-3.5 * viewport.zoom}
                            offsetTop={-7 * viewport.zoom}
                        >

                            <Room
                                style={{
                                    fontSize: 7 * viewport.zoom,
                                    color: "tomato",
                                    cursor: "pointer"
                                }}
                            />

                        </Marker>
                    </>
                ) : null}

            </ReactMapGL>


        </div>
    )
}
export default PruebaMap;
