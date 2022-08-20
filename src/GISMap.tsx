import React, { useEffect, useRef } from 'react';
import './css/GISMap.css';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

function GISMap() {
  const viewDiv = useRef();
  useEffect(() => {

    const map = new Map({
      basemap: {
        portalItem: {
          id: "3582b744bba84668b52a16b0b6942544" //Light gray vector tile
        }
      }
    });

    const view = new MapView({
      map: map,
      container: viewDiv.current,
      spatialReference: {
        wkid: 102100
      },
      center: [-79.64, 43.58],
      zoom: 10
    });

  }, []);
  return (<div id="mapDiv" ref={viewDiv}></div>);
}
export default GISMap;