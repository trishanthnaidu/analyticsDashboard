import React, { useState, Fragment } from "react";
import ReactTooltip from "react-tooltip";
import {
      ComposableMap,
      Geographies,
      Geography,
      ZoomableGroup,
      Marker,
      Annotation
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { useTheme } from '../Core';
import { scaleQuantile } from "d3-scale";
import { Styles } from "../../styles/MapCharts";
import { Tooltip } from '../Core';
import { geoJSONState } from '../../assets/geoJSON/geo-json-india-state';
import { geoJSONRegion } from '../../assets/geoJSON/geo-json-india-region';



export const Maps = ({
      theme = "day",
      geoDivision = "state",
      colorCode = [],
      seaColorCode = "#a5daf5",
      dataJSON = {},
      markers = {
            radius: 0.8,
            color: ""
      },
      geoPosition = [],
      divisionBy = "",
      options = {
            height: 500,
            width: 500,
            zoom: 4.5,
            center: []
      },
      onRegionClick,
      stateStyles = {},
      region = stateMappings.India
}) => {
      let isMarkerEnabled = false;
      const appTheme = useTheme();
      const centerConst = [-280, 15];
      const division = { state: "state", region: "region" }
      const defaultsForNight = {
            colorCode: ["#fef50a", "#ffd827", "#febc44", "#ff9e60", "#ff837c", "#ff6897", "#fb4ab5", "#cf32d0", "#a134ed", "#7635ff", "#4a34ff", "#1c33ff", "#042eeb", "#0220b2"],
            seaColorCode: appTheme.background[20],
      }
      const defaultsForDay = {
            colorCode: ["#bec9a7", "#b2ad8d", "#f2e1d9", "#efcdc4", "#edbcb8", "#f2a3a9", "#e3738c"],
            seaColorCode: appTheme.background[20],
      }
      const classes = Styles();
      const [content, setContent] = useState("");
      if (Array.isArray(geoPosition) && geoPosition.length > 0) {
            isMarkerEnabled = true;
      }
      // if (geoPosition.length !== 0 && Array.isArray(geoPosition)) {
      //       console.error(`invalid proptype: Props "geoPosition" should be of type array`)
      //       return;
      // }
      // if (geoDivision !== "state" || geoDivision !== "district") {
      //       console.error(`invalid props value: value of "geoDivision" can either be "state" or "district". Currently @Rootjs/maps provide geo division based on state and district only. We are currntly working on the city level geo division. `)
      //       return;
      // }
      // if (theme !== "day" || theme !== "night") {
      //       console.error(`invalid props value: value of "theme" can either be "day" or "night".`)
      //       return;
      // }
      if (colorCode.length === 0) {
            if (theme === "day") {
                  colorCode = defaultsForDay.colorCode
                  seaColorCode = defaultsForDay.seaColorCode
            } else if (theme === "night") {
                  colorCode = defaultsForNight.colorCode
                  seaColorCode = defaultsForNight.seaColorCode
            }
      }

      const colorScale = scaleQuantile()
            .domain(dataJSON.map(d => d[divisionBy]))
            .range(colorCode);
      const PlotMarkers = () =>
            geoPosition.map(pos =>
                  <Marker coordinates={pos}>
                        <circle r={markers.radius} fill={markers.color} />
                  </Marker>
            );
      const offsets = {
            VT: [50, -8],
            NH: [34, 2],
            MA: [30, -1],
            RI: [28, 2],
            CT: [35, 10],
            NJ: [34, 1],
            DE: [33, 0],
            MD: [47, 10],
            DC: [49, 21]
      };

      return (
            <div className={classes.root}>
                  <ComposableMap projection="geoMercator" className={classes.projection} style={{
                        backgroundColor: seaColorCode,
                        height: options.height,
                        width: options.width
                  }}>
                        <ZoomableGroup
                              zoom={options.zoom}
                              disableZooming={true}
                              disablePanning={true}
                              center={[centerConst[0] + options.center[0], centerConst[1] + options.center[1]]}
                        >
                              <Geographies
                                    geography={geoDivision !== division.state ? geoJSONRegion : geoJSONState}
                              >
                                    {
                                          region === stateMappings.India ?
                                                ({ geographies }) => (
                                                      <>
                                                            {
                                                                  geographies.map(geo => {
                                                                        const cur = dataJSON.find(s => s.id === geo.id);
                                                                        return (
                                                                              <Fragment>
                                                                                    <Geography
                                                                                          geography={geo}
                                                                                          key={geo.rsmKey}
                                                                                          style={stateStyles}
                                                                                          id={'id_' + geo.id}
                                                                                          onClick={onRegionClick}
                                                                                          className={classes.states}
                                                                                          fill={colorScale(cur ? cur.unemployment_rate : colorCode)}
                                                                                          name={geo.properties.name}
                                                                                          {...stateStyles}
                                                                                    />
                                                                              </Fragment>
                                                                        );
                                                                  })
                                                            }
                                                            {
                                                                  geographies.map(geo => {
                                                                        const centroid = geoCentroid(geo);
                                                                        const cur = dataJSON.find(s => s.id === geo.id);
                                                                        return (
                                                                              <g key={geo.rsmKey + "-name"} className="hello">
                                                                                    {cur &&

                                                                                          <Marker coordinates={centroid}>
                                                                                                <text y="0" fontSize={1} textAnchor="middle" fill="#666">
                                                                                                      {cur.name}
                                                                                                </text>
                                                                                          </Marker>
                                                                                    }
                                                                              </g>
                                                                        );
                                                                  })
                                                            }
                                                      </>
                                                )
                                                :
                                                ({ geographies }) => (
                                                      <>
                                                            {
                                                                  geographies.map(geo => {
                                                                        if (geo.properties.stateId === region) {
                                                                              const cur = dataJSON.find(s => s.id === geo.id);
                                                                              return (
                                                                                    <Tooltip title={geo.properties.regionName} placement="top">
                                                                                          <Geography
                                                                                                geography={geo}
                                                                                                key={geo.rsmKey}
                                                                                                id={'id_' + geo.id}
                                                                                                onClick={onRegionClick}
                                                                                                className={classes.states}
                                                                                                fill={colorScale(cur ? cur.unemployment_rate : colorCode)}
                                                                                                {...stateStyles}
                                                                                          />
                                                                                    </Tooltip>
                                                                              );
                                                                        }
                                                                  })
                                                            }
                                                            {
                                                                  geographies.map(geo => {
                                                                        if (geo.properties.stateId === region) {
                                                                              const centroid = geoCentroid(geo);
                                                                              const cur = dataJSON.find(s => s.id === geo.id);
                                                                              return (
                                                                                    <g key={geo.rsmKey + "-name"}>
                                                                                          {cur &&
                                                                                                <Marker coordinates={centroid}>
                                                                                                      <text y="0" fontSize={0.25} textAnchor="middle" fill="#666">
                                                                                                            {cur.name}
                                                                                                      </text>
                                                                                                </Marker>
                                                                                          }
                                                                                    </g>
                                                                              );
                                                                        }
                                                                  })
                                                            }
                                                      </>
                                                )
                                    }
                              </Geographies>
                              {
                                    isMarkerEnabled && <PlotMarkers />
                              }
                        </ZoomableGroup>
                  </ComposableMap>
            </div>
      );
}

export const stateMappings = {
      "India": "0000",
      "Andaman and Nicobar": "0001",
      "AndhraPradesh": "0002",
      "ArunachalPradesh": "0003",
      "Assam": "0004",
      "Bihar": "0005",
      "Chhattisgarh": "0006",
      "Puducherry": "0007",
      "Punjab": "0008",
      "Rajasthan": "0009",
      "Sikkim": "00010",
      "TamilNadu": "0011",
      "Chandigarh": "0012",
      "Telangana": "0013",
      "Tripura": "0014",
      "UttarPradesh": "0015",
      "Uttaranchal": "0016",
      "WestBengal": "0017",
      "Orissa": "0018",
      "DadraandNagarHaveli": "0019",
      "DamanandDiu": "0020",
      "Goa": "0021",
      "Gujarat": "0022",
      "Haryana": "0023",
      "HimachalPradesh": "0024",
      "JammuandKashmir": "0025",
      "Jharkhand": "0026",
      "Karnataka": "0027",
      "Kerala": "0028",
      "Lakshadweep": "0029",
      "MadhyaPradesh": "0030",
      "Maharashtra": "0031",
      "Manipur": "0032",
      "Meghalaya": "0033",
      "Mizoram": "0034",
      "Nagaland": "0035",
      "Delhi": "0036"
}

export const stateGeoAdjustments = {
      "India": { zoom: 7, center: [2, 8] },
      "AndamanandNicobar": "0001",
      "AndhraPradesh": { zoom: 30, center: [0.5, 1.3] },
      "ArunachalPradesh": { zoom: 40, center: [14.5, 13] },
      "Assam": { zoom: 40, center: [13, 11] },
      "Bihar": { zoom: 50, center: [5.8, 10.8] },
      "Chhattisgarh": { zoom: 33, center: [2, 6] },
      "Puducherry": { zoom: 50, center: [-2.5, -3.5] },
      "Punjab": { zoom: 55, center: [-4.7, 16] },
      "Rajasthan": { zoom: 28, center: [-6.2, 11.7] },
      "Sikkim": { zoom: 70, center: [8.5, 12.5] },
      "TamilNadu": { zoom: 40, center: [-1.7, -4.2] },
      "Chandigarh": { zoom: 70, center: [-3.3, 15.7] },
      "Telangana": { zoom: 20, center: [0.5, 1.3] },
      "Tripura": { zoom: 65, center: [11.8, 8.7] },
      "UttarPradesh": { zoom: 33, center: [0.8, 12.2] },
      "Uttaranchal": { zoom: 60, center: [-0.7, 15.1] },
      "WestBengal": { zoom: 35, center: [8, 9.5] },
      "Orissa": { zoom: 40, center: [4.5, 5.2] },
      "DadraandNagarHaveli": { zoom: 80, center: [-7, 5.2] },
      "DamanandDiu": { zoom: 60, center: [-8.5, 5.5] },
      "Goa": { zoom: 200, center: [-5.9, 0.35] },
      "Gujarat": { zoom: 40, center: [-8.5, 7.5] },
      "Haryana": { zoom: 55, center: [-3.7, 14.2] },
      "HimachalPradesh": { zoom: 55, center: [-2.7, 16.7] },
      "JammuandKashmir": { zoom: 30, center: [-3.8, 19.5] },
      "Jharkhand": { zoom: 50, center: [5.7, 8.7] },
      "Karnataka": { zoom: 32, center: [-3.7, 0] },
      "Kerala": { zoom: 45, center: [-3.7, -4.5] },
      "Lakshadweep": "0029",
      "MadhyaPradesh": { zoom: 30, center: [-1.6, 8.8] },
      "Maharashtra": { zoom: 30, center: [-3.5, 3.8] },
      "Manipur": { zoom: 65, center: [13.8, 9.7] },
      "Meghalaya": { zoom: 65, center: [11.2, 10.5] },
      "Mizoram": { zoom: 65, center: [12.8, 8.2] },
      "Nagaland": { zoom: 65, center: [14.3, 11] },
      "Delhi": { zoom: 70, center: [-3, 13.7] },
}