'use client';

import React from 'react';
import { GoogleMap, Polyline } from '@react-google-maps/api';

interface RouteMapProps {
    path: { lat: number; lng: number }[];
    cityCenter?: { lat: number; lng: number };
}

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '12px'
};

const defaultCenter = {
    lat: 28.6139,
    lng: 77.2090
};

const options = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
        },
    ]
};

const RouteMap: React.FC<RouteMapProps> = ({ path, cityCenter }) => {
    const center = path.length > 0 ? path[0] : (cityCenter || defaultCenter);

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            options={options}
        >
            {path.length > 0 && (
                <Polyline
                    path={path}
                    options={{
                        strokeColor: '#FFD700', // Gold/Yellow for visibility
                        strokeOpacity: 0.8,
                        strokeWeight: 5,
                    }}
                />
            )}
        </GoogleMap>
    );
};

export default RouteMap;
