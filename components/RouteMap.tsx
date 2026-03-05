'use client';

import React from 'react';
import { GoogleMap, Polyline, useJsApiLoader } from '@react-google-maps/api';

interface RouteMapProps {
  path: { lat: number; lng: number }[];
  cityCenter?: { lat: number; lng: number };
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '12px',
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
  ],
};

const RouteMap: React.FC<RouteMapProps> = ({ path, cityCenter }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 bg-black/20 rounded-xl">
        Map could not be loaded
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full text-yellow-500 bg-black/20 rounded-xl animate-pulse">
        Loading Map...
      </div>
    );
  }

  const center = path.length > 0 ? path[0] : cityCenter || defaultCenter;

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
            strokeColor: '#FFD700',
            strokeOpacity: 0.8,
            strokeWeight: 5,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default RouteMap;
