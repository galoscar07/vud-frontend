import React, {useEffect, useRef, useState} from "react";
import './Map.scss'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

const token = 'pk.eyJ1IjoidnJlYXVkb2N0b3IiLCJhIjoiY2xmcXpvMmF0MDNrczN4cWhtZzQ4a3J3NyJ9.YrlkCUsRnjK4BlOCyaHxiA'
mapboxgl.accessToken = token

function MapWrapper({locations, location, classes}) {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapState, setMapState] = useState(null)
  const [markersState, setMarkersState] = useState([])
  const [lng, setLng] = useState(26.096306);
  const [lat, setLat] = useState(44.439663);
  const [zoom, setZoom] = useState(9);

  const [locState, setLocState] = useState([])

  const fetchMapBoxApi = async (loc) => {
    const encoded = encodeURIComponent(loc)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encoded}.json?limit=1&access_token=${token}`
    return await fetch(url, { method: 'GET' }).then((res) => res.json())
  }

  const getLatAndLongFromAddresses = async (locations) => {
    const markersCoordinates = []
    for (const loc of locations) {
      const resp = await fetchMapBoxApi(loc.address)
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
      }
      markersCoordinates.push(point)
    }
    if (markersCoordinates.length > 0) {
      let markersList = []
      for (const mstate of markersState) {
        mstate.remove()
      }
      if (!mapState) return
      markersCoordinates.map((feature) => {
        const tempMarker = new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(mapState)
        markersList.push(tempMarker)
      })
      setMarkersState(markersList)
    }
  }

  useEffect( () => {
    if (locations && locations.length > 0) {
      if (JSON.stringify(locations) !== JSON.stringify(locState)) {
        getLatAndLongFromAddresses(locations)
        setLocState(locations)
      }
    }
  }, [locations])

  useEffect( () => {
    if (location && location.length > 0) {
      getLatAndLongFromAddresses(location)
    }
  }, [location])

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    setMapState(map.current)
  });

  return (
    <div ref={mapContainer} className={classes || 'map-container'} />
  )
}

export default MapWrapper
