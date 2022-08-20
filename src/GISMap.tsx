import React, { useEffect, useRef } from 'react';
import './css/GISMap.css';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

function GISMap() {
  const viewDiv = useRef();
  useEffect(() => {

    const map = new Map({
      basemap: "streets-vector"
    });
    
    const view = new MapView({
      map: map,
      container: viewDiv.current,
      center: [-118.244, 34.052],
      zoom: 12
    });
    
    view.when(() => {
      console.log("Map is loaded");
    })
  }, []);
  return (<div ref={viewDiv}>hello</div>);
}
export default GISMap;