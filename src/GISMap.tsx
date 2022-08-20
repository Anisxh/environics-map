import React, { useEffect, useRef } from 'react';
import './css/GISMap.css';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { renderIntoDocument } from 'react-dom/test-utils';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

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
      center: [-79.64, 43.61],
      zoom: 10
    });

    const wardLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/hM5ymMLbxIyWTjn2/arcgis/rest/services/Ward_Boundaries/FeatureServer/2",
      renderer: new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: [0, 0, 0, 0],
          outline: {
            width: 1,
            color: "red"
          }
        })
      }),
      labelingInfo: [new LabelClass({
        symbol: {
          type: "text",
          color: "black"
        },
        labelExpressionInfo: {
          expression: "$feature.COUNCILLOR"
        }
      })]
    });
    map.add(wardLayer);

    const fireStationsLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/hM5ymMLbxIyWTjn2/arcgis/rest/services/City_Fire_Stations/FeatureServer/0",
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: "red",
          size: "10px"
        })
      })
    });
    
    const librariesLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/hM5ymMLbxIyWTjn2/ArcGIS/rest/services/City_Libraries/FeatureServer/0",
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: "blue",
          style: "square",
          size: "10px"
        })
      })
    });
    
    const communityCentresLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/hM5ymMLbxIyWTjn2/ArcGIS/rest/services/City_Community_Centres/FeatureServer/0",
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: "green",
          style: "circle",
          size: "10px"
        })
      })
    });
    
    map.add(fireStationsLayer);
    map.add(librariesLayer);
    map.add(communityCentresLayer);
    

    view.when(() => {
      view.extent = wardLayer.fullExtent;
    })
  }, []);
  return (<div id="mapDiv" ref={viewDiv}></div>);
}
export default GISMap;