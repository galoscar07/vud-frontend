import React, { useEffect, useRef, useState } from "react";
import './Map.scss';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

const token = 'pk.eyJ1IjoidnJlYXVkb2N0b3IiLCJhIjoiY2xmcXpvMmF0MDNrczN4cWhtZzQ4a3J3NyJ9.YrlkCUsRnjK4BlOCyaHxiA';
mapboxgl.accessToken = token;

function MapWrapper({ locations, location, classes }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapState, setMapState] = useState(null);
  const [markersState, setMarkersState] = useState([]);
  const [lng, setLng] = useState(26.096306);
  const [lat, setLat] = useState(44.439663);
  const [zoom, setZoom] = useState(9);
  const [locState, setLocState] = useState([]);

  const fetchMapBoxApi = async (loc) => {
    const encoded = encodeURIComponent(loc);
    // Adding `country=RO` to ensure results are limited to Romania
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?limit=1&country=RO&access_token=${token}`;
    return await fetch(url, { method: 'GET' }).then((res) => res.json());
  };

  const getLatAndLongFromAddresses = async (locations) => {
    const markersCoordinates = [];
    for (const loc of locations) {
      const resp = await fetchMapBoxApi(loc.address);
      const point = {
        "type": "Feature",
        "properties": {
          "title": loc.name,
          "description": loc.description
        },
        "geometry": {
          "coordinates": [resp?.features[0]?.center[0] || 0, resp?.features[0]?.center[1] || 0],
          "type": "Point"
        }
      };
      markersCoordinates.push(point);
    }

    if (markersCoordinates.length > 0) {
      let markersList = [];
      for (const mstate of markersState) {
        mstate.remove(); // Remove old markers
      }

      if (!mapState) return;

      const bounds = new mapboxgl.LngLatBounds(); // Create bounds object

      // Use slice(0, 4) instead of splice to avoid mutating the original array
      markersCoordinates.slice(0, 4).forEach((feature) => {
        const tempMarker = new mapboxgl.Marker()
            .setLngLat(feature.geometry.coordinates)
            .addTo(mapState);
        markersList.push(tempMarker);

        bounds.extend(feature.geometry.coordinates); // Extend the bounds to include this marker
      });

      setMarkersState(markersList);

      if (markersCoordinates.length > 1) {
        mapState.fitBounds(bounds, { padding: 50 }); // Zoom and center to fit all markers in view
      } else {
        // If there is only one marker, zoom to it directly
        mapState.flyTo({ center: markersCoordinates[0].geometry.coordinates, zoom: 14 });
      }
    }
  };

  useEffect(() => {
    if (locations && locations.length > 0) {
      if (JSON.stringify(locations) !== JSON.stringify(locState)) {
        getLatAndLongFromAddresses(locations);
        setLocState(locations);
      }
    }
  }, [locations]);

  useEffect(() => {
    if (location && location.length > 0) {
      getLatAndLongFromAddresses(location);
    }
  }, [location]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    setMapState(map.current);
  }, []);

  return (
      <div ref={mapContainer} className={classes || 'map-container'} />
  );
}

export default MapWrapper;
