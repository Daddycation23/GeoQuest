import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

function Map({ location, hintLocation, userGuess, onMapClick, showTarget, is3DMode }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['maps'],
  });

  const mapRef = useRef(null);
  const [mapType, setMapType] = useState(is3DMode ? 'satellite' : 'roadmap');

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    updateMapSettings(map);
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      updateMapSettings(mapRef.current);
    }
  }, [is3DMode]);

  const updateMapSettings = (map) => {
    if (is3DMode) {
      map.setTilt(45);
      map.setHeading(0);
      setMapType('satellite');
    } else {
      map.setTilt(0);
      map.setHeading(0);
      setMapType('roadmap');
    }
    map.setMapTypeId(mapType);
  };

  const handleMapTypeChange = () => {
    if (mapRef.current) {
      setMapType(mapRef.current.getMapTypeId());
    }
  };

  return isLoaded ? (
    <GoogleMap
      center={{ lat: location.lat, lng: location.lng }}
      zoom={15}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      onClick={onMapClick}
      onLoad={onMapLoad}
      onMapTypeIdChanged={handleMapTypeChange}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
        },
        tilt: is3DMode ? 45 : 0,
        mapTypeId: mapType,
      }}
    >
      {hintLocation && (
        <Marker
          position={{ lat: hintLocation.lat, lng: hintLocation.lng }}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          }}
        />
      )}
      {userGuess && (
        <Marker
          position={{ lat: userGuess.lat, lng: userGuess.lng }}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          }}
        />
      )}
      {showTarget && (
        <Marker
          position={{ lat: location.lat, lng: location.lng }}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }}
        />
      )}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}

export default Map;
