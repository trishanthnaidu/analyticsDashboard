import React, { useState, useEffect, Fragment } from 'react';
import * as d3 from "d3";
import {
      ExpandMoreRounded,
      List,
      ListItem,
      Divider,
      ListItemText,
      ListSubheader,
      MenuItem,
      withStyles,
      Grid
} from '../Core';
import { Maps, stateMappings, stateGeoAdjustments } from "../Toolkit/Maps";
import ZaprCSV from "../../assets/stylesheets/Zapr.csv";
import { Styles } from "../../styles/MarketPerformance";
import stateCSV from "../../assets/csv/state-mappings.csv";
import regionCSV from "../../assets/csv/region-mappings.csv";
import { SelectButton } from '../Toolkit';
import { Button } from '@material-ui/core';

const marketRegions = {
      "HSM": "HSM",
      "South": "South",
      "Regional": "Regional",
      "AP": "Andhra Pradesh",
      "Bihar": "Bihar",
      "Delhi": "Delhi",
      "Gujarat": "Gujarat",
      "Karnataka": "Karnataka",
      "Kerala": "Kerala",
      "MP": "Madhya Pradesh",
      "Maharashtra": "Maharashtra",
      "NE": "North East",
      "Odisha": "Orissa",
      "PHCHP": "PHCHP",
      "Rajasthan": "Rajasthan",
      "TN": "Tamil Nadu",
      "UP": "Uttar Pradesh",
      "WB": "West Bengal"
}
const stateNames = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Chandigarh", "Telangana", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal", "Orissa", "Dadra and Nagar Haveli", "Daman and Diu", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Delhi"];

const Component = () => {
      const classes = Styles();
      const [state, setState] = useState({
            stateData: [],
            distData: [],
            zaprData: [],
            selectedState: "India",
            anchorRegionSelection: null
      });
      const stateNameKey = state.selectedState.replace(/ /g, '');
      const heatColorByArea = ["#fef50a", "#ffd827", "#febc44", "#ff9e60", "#ff837c", "#ff6897", "#fb4ab5", "#cf32d0", "#a134ed", "#7635ff", "#4a34ff", "#1c33ff", "#042eeb", "#0220b2"];
      const heatColorByAreaBackground = "#ddd";
      const heatColorByGeoDensity = "#001335";
      const heatColorByGeoDensityBackground = "#222222";
      const props = {
            theme: "day",
            divisionBy: "unemployment_rate"
      };
      const onRegionSelectClick = evt => {
            setState({ ...state, anchorRegionSelection: evt.currentTarget });
      }
      const onRegionSelectClose = evt => {
            setState({ ...state, anchorRegionSelection: null });
      }
      const onRegionSelect = selectedState => {
            setState({ ...state, selectedState, anchorRegionSelection: null })
      }
      const onRegionResetToIndia = () => {
            setState({ ...state, selectedState: "India" });
      }
      useEffect(() => {
            d3.csv(regionCSV).then(distData => {
                  d3.csv(stateCSV).then(stateData => {
                        d3.csv(ZaprCSV).then(zaprData => {
                              let ZaprData = [];
                              zaprData.forEach(d => {
                                    if (state.selectedState !== "" && d.state.toUpperCase() === state.selectedState.toUpperCase()) {
                                          ZaprData.push([d.long, d.lat]);
                                    }
                              });
                              setState({ ...state, stateData, zaprData: ZaprData, distData })
                        })
                  })
            })
      }, []);

      return (
            <div className={classes.root}>
                  <div className={classes.wholeMapContainer}>

                        <Grid container alignItems="center" className={classes.gridBtn}>
                              {
                                    state.selectedState !== "India" &&
                                    <Fragment>
                                          <Button
                                                className={classes.btnRegion}
                                                color="primary"
                                                onClick={onRegionResetToIndia}
                                          >India</Button>
                                          <Divider orientation="vertical" className={classes.verticalDivider}/>
                                    </Fragment>
                              }
                              <SelectButton
                                    ButtonProps={{
                                          color: "primary",
                                          className: classes.btnRegion,
                                          onClick: onRegionSelectClick,
                                          placeholder: "Select Region"
                                    }}
                                    MenuProps={{
                                          anchorEl: state.anchorRegionSelection,
                                          open: Boolean(state.anchorRegionSelection),
                                          onClose: onRegionSelectClose,
                                          PopoverClasses: {
                                                paper: classes.popover_Paper
                                          }
                                    }}
                                    MenuItems={
                                          <List
                                                component="nav"
                                                className={classes.regionMenu}
                                          >
                                                {/* <ListSubheader
                                                      component="div"
                                                      className={classes.subHeader}
                                                >Market Regions</ListSubheader>
                                                {
                                                      Object.keys(marketRegions).map((item, itr) =>
                                                            <Fragment>
                                                                  <MenuItem
                                                                        value={item}
                                                                        onClick={() => onRegionSelect(marketRegions[item]) }
                                                                  >{item}
                                                                  </MenuItem>
                                                            </Fragment>
                                                      )
                                                } */}
                                                <ListSubheader
                                                      component="div"
                                                      className={classes.subHeader}
                                                >All States</ListSubheader>
                                                {
                                                      stateNames.map(
                                                            (item, itr) => {
                                                                  return (
                                                                        itr === 0 ?
                                                                              <Divider className={classes.divider} />
                                                                              :
                                                                              <Fragment>
                                                                                    <MenuItem
                                                                                          value={item}
                                                                                          onClick={() => onRegionSelect(item)}
                                                                                    >{item}
                                                                                    </MenuItem>
                                                                              </Fragment>
                                                                  )
                                                            }
                                                      )
                                                }
                                          </List>
                                    }
                              >
                                    {state.selectedState}
                                    <ExpandMoreRounded />
                              </SelectButton>
                        </Grid>
                        {
                              state.selectedState !== "" && state.selectedState !== "India" ?
                                    <Maps
                                          geoDivision="district"
                                          divisionBy={props.divisionBy}
                                          dataJSON={state.distData}
                                          options={{
                                                height: "85vh",
                                                width: "55vw",
                                                zoom: stateGeoAdjustments[stateNameKey].zoom,
                                                center: stateGeoAdjustments[stateNameKey].center
                                          }}
                                          region={stateMappings[stateNameKey]}
                                          stateStyles={{
                                                stroke: "#fff",
                                                strokeWidth: 0.01
                                          }}
                                    />
                                    :
                                    <Maps
                                          geoDivision="state"
                                          theme={props.theme}
                                          divisionBy={props.divisionBy}
                                          dataJSON={state.stateData}
                                          options={{
                                                height: "85vh",
                                                width: "55vw",
                                                zoom: stateGeoAdjustments.India.zoom,
                                                center: stateGeoAdjustments.India.center
                                          }}
                                          region={stateMappings.India}
                                          stateStyles={{
                                                stroke: "#fff",
                                                strokeWidth: 0.02
                                          }}
                                          onRegionClick={evt => {
                                                setState({ ...state, selectedState: evt.currentTarget.getAttribute("name") })
                                          }}
                                    />
                        }

                        {/* MAHARASHTRA */}

                        {/* <Maps
                              geoDivision="district"
                              divisionBy={props.divisionBy}
                              dataJSON={state.distData}
                              options={{
                                    height: "85vh",
                                    width: "55vw",
                                    zoom: 30,
                                    center: [-3.5, 3.8]
                              }}
                              region={stateMappings.Maharashtra}
                              stateStyles={{
                                    stroke: "#fff",
                                    strokeWidth: 0.01
                              }}
                        /> */}
                  </div>
            </div>
      )
}

export const MarketPerformance = withStyles(Styles)(Component)


{/* <Maps
      geoDivision="state"
      colorCode={[]}
      seaColorCode=""
      dataJSON={}
      dataCSV={}
      geoPosition={[]}
      markers={{
            radius: 2,
            color: "",
      }}
/>

      <StateMaps
            colorCode={[]}
            dataJSON={}
            dataCSV={}
      /> */}