import React, { useState, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from "@material-ui/core/Menu";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { PrismCalendar } from "../components/Pickers";
import {
      CalendarTodayRounded as CalendarTodayRoundedIcon,
      AddRounded as AddIconRounded,
      AccessTimeRounded as TimeSlotRoundedIcon,
      ExpandMoreRounded as ExpandMoreIcon,
      TodayRounded as TodayIcon 
} from './Core';
import { TimeSlider } from './TimeSlider';
import { Styles } from "../styles/AppDrawer";
import { useTheme } from '@material-ui/core/styles';
import { Button } from './Toolkit';

export const AppDrawer = () => {
      const classes = Styles();
      const theme = useTheme();
      const [state, setState] = useState({
            timePeriodValue: "",
            timePeriodValueComparedWith: "",
            timePeriodAnchor: null,
            timePeriodAnchorComparedWith: null,
            timeSlotAnchor: null,
            timeSlotAnchorComparedWith: null,
            timeSlotValue: "2.00 AM - 1:59 AM",
            timeSlotValueComapredWith: "2.00 AM - 1:59 AM",
            compareWith: false
      });
      const openTimePeriodPopup = Boolean(state.timePeriodAnchor);
      const openTimePeriodComparedWithPopup = Boolean(state.timePeriodAnchorComparedWith);
      const openTimeSlotPopup = Boolean(state.timeSlotAnchor);
      const openTimeSlotComapredWithPopup = Boolean(state.timeSlotAnchorComparedWith);

      const onTimePeriodClick = evt => {
            setState({ ...state, timePeriodAnchor: evt.currentTarget });
      };
      const onTimePeriodComparedWithClick = evt => {
            setState({ ...state, timePeriodAnchorComparedWith: evt.currentTarget });
      }
      const onTimeSlotClick = evt => {
            setState({ ...state, timeSlotAnchor: evt.currentTarget });
      }
      const onTimeSlotComparedWithClick = evt => {
            setState({ ...state, timeSlotAnchorComparedWith: evt.currentTarget });
      }
      const onTimeSlotChange = timeSlotValue => {
            setState({ ...state, timeSlotValue });
      }
      const onTimeSlotChangeComparedWith = timeSlotValueComapredWith => {
            setState({ ...state, timeSlotValueComapredWith });
      }
      const onCompareWithChecked = evt => {
            setState({
                  ...state,
                  compareWith: evt.target.checked
            })
      }
      const closeTimePeriodPopup = () => {
            setState({ ...state, timePeriodAnchor: null })
      }
      const closeTimePeriodComparedWithPopup = () => {
            setState({ ...state, timePeriodAnchorComparedWith: null })
      }
      const closeTimeSlotPopup = () => {
            setState({ ...state, timeSlotAnchor: null })
      }
      const closeTimeSlotComparedWithPopup = () => {
            setState({ ...state, timeSlotAnchorComparedWith: null })
      }
      const calendarConfirmed = (calendarState, selectedSequence) => {
            let calendarStr = [];
            const selectedState = calendarState['selected' + calendarState.timePeriodTogglerValue];
            const keys = Object.keys(selectedState);

            calendarStr = generateCalendarString[
                  "generateCalendarStringFor" + calendarState.timePeriodTogglerValue
            ](keys, selectedState, selectedSequence);

            setState({
                  ...state,
                  timePeriodValue: calendarStr,
                  timePeriodAnchor: null
            });
      }
      const calendarConfirmedComparedWith = (calendarState, selectedSequence) => {
            let calendarStr = [];
            const selectedState = calendarState['selected' + calendarState.timePeriodTogglerValue];
            const keys = Object.keys(selectedState);

            calendarStr = generateCalendarString[
                  "generateCalendarStringFor" + calendarState.timePeriodTogglerValue
            ](keys, selectedState, selectedSequence);

            setState({
                  ...state,
                  timePeriodValueComparedWith: calendarStr,
                  timePeriodAnchorComparedWith: null
            });
      }
      const getDate = (year, day) => new Date(year, 0, day).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short'
      });
      const generateCalendarString = {
            generateCalendarStringForMonths: (keys, selectedMonths, selectedSequence) => {
                  let MonthsStr = "";
                  if (selectedSequence.quickSelectsSelectedValue.length > 0) {
                        return selectedSequence.quickSelectsSelectedValue;
                  } else {
                        keys.sort((a, b) => b - a).forEach((year, itr, arr) => {
                              selectedSequence.selectedSequenceOfMonths[year].forEach(month => {
                                    MonthsStr.length > 0 && (MonthsStr = MonthsStr.concat(", "));
                                    if (month.length === 1) {
                                          MonthsStr = MonthsStr.concat(`M${parseInt(month) + 1}`);
                                    } else if (month.length === 2) {
                                          MonthsStr = MonthsStr.concat(`M${parseInt(month[0]) + 1}`).concat(`, M${parseInt(month[1]) + 1}`);
                                    } else {
                                          MonthsStr = MonthsStr.concat(`M${parseInt(month[0]) + 1} - M${parseInt(month[month.length - 1]) + 1}`);
                                    }
                              });
                        });

                        return MonthsStr;
                  }
            },
            generateCalendarStringForWeeks: (keys, selectedWeeks, selectedSequence) => {
                  let weeksStr = "";
                  if (selectedSequence.quickSelectsSelectedValueForWeeks.length > 0) {
                        return selectedSequence.quickSelectsSelectedValueForWeeks;
                  } else {
                        keys.sort((a, b) => b - a).forEach((year, itr, arr) => {
                              selectedSequence.selectedSequenceOfWeeks[year].forEach(weeks => {
                                    weeksStr.length > 0 && (weeksStr = weeksStr.concat(", "));
                                    if (weeks.length === 1) {
                                          weeksStr = weeksStr.concat("W" + weeks);
                                    } else if (weeks.length === 2) {
                                          weeksStr = weeksStr.concat("W" + weeks[0]).concat(", W" + weeks[1]);
                                    } else {
                                          weeksStr = weeksStr.concat(`W${weeks[0]} - W${weeks[weeks.length - 1]}`);
                                    }
                              });
                        });

                        return weeksStr;
                  }
            },
            generateCalendarStringForDays: (keys, selectedDays, selectedSequence) => {
                  let daysStr = "";
                  if (selectedSequence.quickSelectsSelectedValueForDays.length > 0) {
                        return selectedSequence.quickSelectsSelectedValueForDays;
                  } else {
                        keys.sort((a, b) => b - a).forEach((year, itr, arr) => {
                              selectedSequence.selectedSequenceOfDays[year].forEach(days => {
                                    daysStr.length > 0 && (daysStr = daysStr.concat(", "));
                                    if (days.length === 1) {
                                          daysStr = daysStr.concat(getDate(year, days) + "'" + year);
                                    } else if (days.length === 2) {
                                          daysStr = daysStr.concat(getDate(year, days[0]) + "'" + year).concat(", " + getDate(year, days[1]) + "'" + year);
                                    } else {
                                          daysStr = daysStr.concat(`${getDate(year, days[0])}'${year} - ${getDate(year, days[days.length - 1])}'${year}`);
                                    }
                              });
                        });

                        return daysStr;
                  }
            }
      }
      return (
            <div className={classes.root}>
                  <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{ paper: classes.drawerPaper }}
                  >
                        <div className={classes.toolbar} />
                        <List>
                              {
                                    ['Network', 'Genre', 'Channel', 'Show', 'Townclass', 'Metric'].map((text, index) =>
                                          <Fragment>
                                                <FormControl className={classes.autocompleteContainer}>
                                                      <Autocomplete
                                                            className={classes.autocomplete}
                                                            classes={{
                                                                  paper: classes.dropDownPopupContainer
                                                            }}
                                                            size="small"
                                                            popupIcon={<ExpandMoreIcon />}
                                                            options={dropDownData[text]}
                                                            getOptionLabel={option => option.title}
                                                            renderInput={params => (
                                                                  <TextField {...params}
                                                                        className={classes.textField}
                                                                        label={text}
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        margin="normal"
                                                                        InputLabelProps={{
                                                                              classes: {
                                                                                    root: classes.autocompleteLabel,
                                                                              }
                                                                        }}
                                                                  />
                                                            )}
                                                            renderOption={(option, { inputValue }) => {
                                                                  const matches = match(option.title, inputValue);
                                                                  const parts = parse(option.title, matches);

                                                                  return (
                                                                        <div className={classes.dropDownPopupContainerOptions}>
                                                                              {parts.map((part, index) => (
                                                                                    <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                                                                          {part.text}
                                                                                    </span>
                                                                              ))}
                                                                        </div>
                                                                  );
                                                            }}
                                                      />
                                                </FormControl>
                                          </Fragment>
                                    )
                              }
                        </List>
                        <Divider className={classes.divider} />
                        <List className={classes.sections}>
                              <Paper elevation={0} className={classes.timePeriodContainer}>
                                    <InputBase
                                          className={classes.timePeriodInputBase}
                                          placeholder="Select Time Period"
                                          defaultValue={state.timePeriodValue}
                                          value={state.timePeriodValue}
                                          htmlFor="timePeriodInputBase"
                                          disabled
                                    />
                                    <ListItemIcon className={classes.icons}>
                                          <IconButton
                                                color="primary"
                                                component="span"
                                                id="timePeriodInputBase"
                                                onClick={onTimePeriodClick}
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                          >
                                                <TodayIcon className={classes.iconSvg} />
                                          </IconButton>
                                          <Menu
                                                id="long-menu"
                                                anchorEl={state.timePeriodAnchor}
                                                keepMounted
                                                open={openTimePeriodPopup}
                                                onClose={closeTimePeriodPopup}
                                                PaperProps={{
                                                      style: {
                                                            maxHeight: 380,
                                                            width: 500,
                                                            backgroundColor: theme.background[30],
                                                            "& ul": {
                                                                  padding: 0
                                                            }
                                                      },

                                                }}
                                                PopoverClasses={{
                                                      root: classes.timePeriodPaperPopup
                                                }}
                                                anchorOrigin={{
                                                      vertical: 'top',
                                                      horizontal: 'right',
                                                }}
                                          >
                                                <PrismCalendar
                                                      closeTimePeriodPopup={closeTimePeriodPopup}
                                                      calendarConfirmed={calendarConfirmed}
                                                />
                                          </Menu>
                                    </ListItemIcon>
                              </Paper>
                        </List>
                        <List>
                              <Paper elevation={0} className={classes.timePeriodContainer}>
                                    <InputBase
                                          className={classes.timePeriodInputBase}
                                          placeholder="Select Timeslots"
                                          defaultValue={state.timeSlotValue}
                                          value={state.timeSlotValue}
                                          htmlFor="timeSlotsInputBase"
                                          disabled
                                    />
                                    <ListItemIcon className={classes.icons}>
                                          <IconButton
                                                color="primary"
                                                component="span"
                                                id="timeSlotsInputBase"
                                                onClick={onTimeSlotClick}
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                          >
                                                <TimeSlotRoundedIcon className={classes.iconSvg} />
                                          </IconButton>
                                          <Menu
                                                id="long-menu"
                                                anchorEl={state.timeSlotAnchor}
                                                keepMounted
                                                open={openTimeSlotPopup}
                                                onClose={closeTimeSlotPopup}
                                                PaperProps={{
                                                      style: {
                                                            maxHeight: 300,
                                                            width: 300,
                                                            backgroundColor: theme.background[30],
                                                            "& ul": {
                                                                  padding: 0
                                                            }
                                                      },

                                                }}
                                                PopoverClasses={{
                                                      root: classes.timePeriodPaperPopup
                                                }}
                                                anchorOrigin={{
                                                      vertical: 'top',
                                                      horizontal: 'right',
                                                }}
                                          >
                                                <TimeSlider
                                                      onTimeSlotChange={onTimeSlotChange}
                                                />
                                          </Menu>
                                    </ListItemIcon>
                              </Paper>
                        </List>
                        <Divider className={classes.dividerNoMargin} />
                        <List>
                              <Paper elevation={0} className={classes.timePeriodContainer}>
                                    <ListItemText className={`${state.compareWith ? classes.compareTitle : classes.compareTitleDisabled}`} primary="Compare with" />
                                    <Switch
                                          className={classes.checkbox}
                                          checked={state.compareWith}
                                          onChange={onCompareWithChecked}
                                          color="primary"
                                          size="small"
                                          classes={{
                                                track: classes.checkBoxTrack
                                          }}
                                    />
                              </Paper>
                        </List>
                        {
                              state.compareWith &&
                              <Fragment>
                                    <Divider className={classes.dividerNoMargin} />
                                    <List>
                                          <Paper elevation={0} className={classes.timePeriodContainer}>
                                                <InputBase
                                                      className={classes.timePeriodInputBase}
                                                      placeholder="Select Time Period"
                                                      defaultValue={state.timePeriodValueComparedWith}
                                                      value={state.timePeriodValueComparedWith}
                                                      htmlFor="timePeriodInputBase"
                                                      disabled
                                                />
                                                <ListItemIcon className={classes.icons}>
                                                      <IconButton
                                                            color="primary"
                                                            component="span"
                                                            id="timePeriodInputBase"
                                                            onClick={onTimePeriodComparedWithClick}
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                      >
                                                            <TodayIcon className={classes.iconSvg} />
                                                      </IconButton>
                                                      <Menu
                                                            id="long-menu"
                                                            anchorEl={state.timePeriodAnchorComparedWith}
                                                            keepMounted
                                                            open={openTimePeriodComparedWithPopup}
                                                            onClose={closeTimePeriodComparedWithPopup}
                                                            PaperProps={{
                                                                  style: {
                                                                        maxHeight: 380,
                                                                        width: 500,
                                                                        backgroundColor: theme.background[30],
                                                                        "& ul": {
                                                                              padding: 0
                                                                        }
                                                                  },

                                                            }}
                                                            PopoverClasses={{
                                                                  root: classes.timePeriodPaperPopup
                                                            }}
                                                            anchorOrigin={{
                                                                  vertical: 'top',
                                                                  horizontal: 'right',
                                                            }}
                                                      >
                                                            <PrismCalendar
                                                                  closeTimePeriodPopup={closeTimePeriodComparedWithPopup}
                                                                  calendarConfirmed={calendarConfirmedComparedWith}
                                                            />
                                                      </Menu>
                                                </ListItemIcon>
                                          </Paper>
                                    </List>
                                    <List>
                                          <Paper elevation={0} className={classes.timePeriodContainer}>
                                                <InputBase
                                                      className={classes.timePeriodInputBase}
                                                      placeholder="Select Timeslots"
                                                      defaultValue={state.timeSlotValueComapredWith}
                                                      value={state.timeSlotValueComapredWith}
                                                      htmlFor="timeSlotsInputBase"
                                                      disabled
                                                />
                                                <ListItemIcon className={classes.icons}>
                                                      <IconButton
                                                            color="primary"
                                                            component="span"
                                                            id="timeSlotsInputBase"
                                                            onClick={onTimeSlotComparedWithClick}
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                      >
                                                            <TimeSlotRoundedIcon className={classes.iconSvg} />
                                                      </IconButton>
                                                      <Menu
                                                            id="long-menu"
                                                            anchorEl={state.timeSlotAnchorComparedWith}
                                                            keepMounted
                                                            open={openTimeSlotComapredWithPopup}
                                                            onClose={closeTimeSlotComparedWithPopup}
                                                            PaperProps={{
                                                                  style: {
                                                                        maxHeight: 300,
                                                                        width: 300,
                                                                        backgroundColor: theme.background[30],
                                                                        "& ul": {
                                                                              padding: 0
                                                                        }
                                                                  },

                                                            }}
                                                            PopoverClasses={{
                                                                  root: classes.timePeriodPaperPopup
                                                            }}
                                                            anchorOrigin={{
                                                                  vertical: 'top',
                                                                  horizontal: 'right',
                                                            }}
                                                      >
                                                            <TimeSlider
                                                                  onTimeSlotChange={onTimeSlotChangeComparedWith}
                                                            />
                                                      </Menu>
                                                </ListItemIcon>
                                          </Paper>
                                    </List>
                              </Fragment>
                        }
                        <div className={classes.btnContainer}>
                              <Button
                                    color="primary"
                                    className={classes.btnReset}
                              >Reset</Button>
                              <Button
                                    color="primary"
                                    variant="contained"
                                    className={classes.btnSubmit}
                              >Submit</Button>
                        </div>
                  </Drawer>
            </div>
      );
}



const options = [
      'None',
      'Atria',
      'Callisto',
      'Dione',
      'Ganymede',
      'Hangouts Call',
      'Luna',
      'Oberon',
      'Phobos',
      'Pyxis',
      'Sedna',
      'Titania',
      'Triton',
      'Umbriel',
];

const dropDownData = {
      Network: [
            { title: "Star Network" },
            { title: "Zee Network" },
            { title: "Sony Network" },
            { title: "TV 18" },
            { title: "DD Network" }
      ],
      Genre: [
            { title: "Hindi GEC" },
            { title: "Hindi Movies" },
            { title: "Hindi News" },
            { title: "Kids" },
            { title: "Marathi GEC" },
            { title: "Bengali GEC" },
            { title: "Hindi Music" },
            { title: "Marathi News" },
            { title: "Sport" },
            { title: "Bhojpuri Movies" },
            { title: "Marathi Movies" }
      ],
      Channel: [
            { title: "Star Plus" },
            { title: "Star Gold" },
            { title: "Star Bharat" },
            { title: "Star Jalsha" },
            { title: "Star Utsav" },
            { title: "UTV Movies" },
            { title: "Star Pravah" },
            { title: "UTV Action" },
            { title: "Hungama" },
            { title: "Star Sports 1 Hindi" },
            { title: "Disney Channel" }
      ],
      Show: [
            { title: "Sanjivani" },
            { title: "Yeh Jaadu hai Jinn Ka" },
            { title: "Yeh Rishta Hain Pyaar Ka" },
            { title: "Ftt-Hff-Chhichhore" },
            { title: "Namah" },
            { title: "Kasauti Zindagi Kay" },
            { title: "Kahaan Hum Kahaan Tum" },
            { title: "Yeh Rishta Kya Kehlata Hai" },
            { title: "Yeh Hai Mohabbatein" },
            { title: "Divya Drishti" },
            { title: "Dance Plus 5" }
      ],
      Townclass: [
            { title: "U + R" },
            { title: "Urban" },
            { title: "Rural" },
            { title: "Megacities" },
            { title: "1 Mn+" }
      ],
      Metric: [
            { title: "Reach %" },
            { title: "WT Share %" }
      ]
}