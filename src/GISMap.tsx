import React, { ChangeEvent, MouseEvent, MouseEventHandler, useEffect, useRef } from 'react';
import './css/GISMap.css';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { renderIntoDocument } from 'react-dom/test-utils';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Popup from "@arcgis/core/widgets/Popup";
import { addListener } from 'process';
import Query from "@arcgis/core/rest/support/Query";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";

function GISMap() {

  const viewDiv = useRef();

  const map = new Map({
    basemap: {
      portalItem: {
        id: "3582b744bba84668b52a16b0b6942544" //Light gray vector tile
      }
    }
  });

  //Layers Widget Toggle Function
  const toggleFunction = (e: React.ChangeEvent<HTMLInputElement>, x: number): void => {
    let layer = map.layers.at(x);
    if (e.target.checked)
      layer.visible = true;
    else
      layer.visible = false;
  }

  useEffect(() => {

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
      })],
      popupTemplate: {
        title: "{WARD}",
        content: ShowWardInfo
      }
    });
    map.add(wardLayer);

    const fireStationsLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/hM5ymMLbxIyWTjn2/arcgis/rest/services/City_Fire_Stations/FeatureServer/0",
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: "red",
          size: "10px"
        })
      }),
      visible: false
    });

    const librariesLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/hM5ymMLbxIyWTjn2/ArcGIS/rest/services/City_Libraries/FeatureServer/0",
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: "blue",
          style: "square",
          size: "10px"
        })
      }),
      visible: false
    });

    const communityCentresLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/hM5ymMLbxIyWTjn2/ArcGIS/rest/services/City_Community_Centres/FeatureServer/0",
      renderer: new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
          color: "green",
          style: "circle",
          size: "10px"
        })
      }),
      visible: false
    });
    map.add(fireStationsLayer);
    map.add(librariesLayer);
    map.add(communityCentresLayer);

    view.ui.add(document.getElementById("layWidgetDiv"), "bottom-right");

    //Function which populates the Popup
    function ShowWardInfo() {
      let totalCount: number = 0;
      alert(view.popup.selectedFeature.geometry);
      //reactiveUtils.when(() => view.popup.selectedFeature?.geometry != null, () => {
        const FSQuery = new Query({
          spatialRelationship: "contains",
          geometry: view.popup.selectedFeature.geometry,
          where: "",
          returnGeometry: true
        });
        console.log(view.popup.selectedFeature.geometry);
        return fireStationsLayer.queryObjectIds(FSQuery)
          .then((results) => {
            totalCount += results.length;
            console.log(totalCount);
            return librariesLayer.queryObjectIds(FSQuery)
              .then((results) => {
                totalCount += results.length;
                console.log(totalCount);
                return communityCentresLayer.queryObjectIds(FSQuery)
                  .then((results) => {
                    totalCount += results.length;
                    console.log(totalCount);
                    return "<div style='background-color:DarkGray;color:white'><label>" + totalCount + " facilities found</label></div>";
                  });
              });
          });
      //});
    }

    view.when(() => {
      view.extent = wardLayer.fullExtent;
    })
  }, []);

  return (
    <React.Fragment>
      <div className='mapDiv' id="mapDiv" ref={viewDiv}></div>
      <div id="layWidgetDiv" className="esri-widget">
        <label className='labelText'>Toggle Layers</label>
        <br />
        <br />
        <div>
          <input id="checkboxId1" type="checkbox" onChange={(e) => toggleFunction(e, 1)} defaultChecked={false} />
          <label className='labelText'>Fire Stations</label>
        </div>
        <div>
          <input id="checkboxId2" type="checkbox" onChange={(e) => toggleFunction(e, 2)} defaultChecked={false} />
          <label className='labelText'>Libraries</label>
        </div>
        <div>
          <input id="checkboxId3" type="checkbox" onChange={(e) => toggleFunction(e, 3)} defaultChecked={false} />
          <label className='labelText'>Community Centres</label>
        </div>
      </div>
    </React.Fragment>
  );
}
export default GISMap;