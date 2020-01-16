import React, { useState, useEffect, Fragment } from 'react';
import { Styles } from "../styles/Pickers";
import { withStyles } from '@material-ui/core/styles';
import { Chip, Divider } from '@material-ui/core';

import {
      SelectionContainer,
      PreSelectionContainer,
      DaysOfWeekContainer,
      CalendarTogglerContainer,
      ActionContainer
} from "../components/Calendar";

export const PrismCalendar = withStyles(Styles)(({ classes, closeTimePeriodPopup, calendarConfirmed }) => {
      let undoRedoFlag = null;
      const selectedSequence = {
            selectedSequenceOfMonths: [],
            selectedSequenceOfDays: [],
            selectedSequenceOfWeeks: [],
            quickSelectsSelectedValue: "",
            quickSelectsSelectedValueForWeeks: "",
            quickSelectsSelectedValueForDays: "",
      }
      const quickSelects = {
            Months: ["Quick Selects", "Last Month", "Last 3 Months", "Last 6 Months", "Last 12 Months"],
            Weeks: ["Quick Selects", "Last Week", "Last 4 Weeks", "Last 13 Weeks"],
            Days: ["Quick Selects", "Yesterday", "Last 10 Days", "Last 15 Days"]
      }
      const daysOfWeek = ["Days of Week", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const monthNamesFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const generateMonths = number => Array.from(new Array(number), (x, i) => (currentMonth - number) + i < 0 ? 11 - i + '_' + (currentYear - 1) : currentMonth - (number - i) + '_' + currentYear)// setting a roundrobin of the Months beyond 52 to start with 1
      const currentDate = new Date();
      const currentYear = currentDate.getUTCFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDayOfYear();
      const yearsItem = [...new Array(5)].map((e, itr) => currentYear - itr);
      const numeicalWeeks = new Date(Date.UTC(currentYear, currentMonth, currentDay)); // currentMonth has count from 0-11; 11 beign Dec
      const currentWeek = numeicalWeeks.getWeek();
      const lastMonth = generateMonths(1);
      const last3Months = generateMonths(3);
      const last6Months = generateMonths(6);
      const last12Months = generateMonths(12);
      const generateWeeks = number => Array.from(new Array(number), (x, i) => (currentWeek - number) + i < 1 ? 53 - i + '_' + (currentYear - 1) : currentWeek - (number - i) + '_' + currentYear) // setting a roundrobin of the weeks beyond 52 to start with 1
      const lastWeek = generateWeeks(1);
      const last4Weeks = generateWeeks(4);
      const last13Weeks = generateWeeks(13);
      const generateDays = number => Array.from(new Array(number), (x, i) => (currentDay - number) + i < 1 ? 365 - i + '_' + (currentYear - 1) : currentDay - (number - i) + '_' + currentYear) // setting a roundrobin of the weeks beyond 365 to start with 1
      const yesterday = generateDays(1);
      const last10Days = generateDays(10);
      const last15Days = generateDays(15);
      const isArrayEqual = (arr1, arr2) => {
            if (arr1.length !== arr2.length)
                  return false;
            if (arr1.sort().toString() === arr2.sort().toString())
                  return true;
            else
                  return false;
      }
      const initialState = {
            timePeriodTogglerValue: "Weeks",
            selectedYear: currentYear,
            selectedYearForWeeks: currentYear,
            selectedYearForDays: currentYear,
            quickSelectsSelectedValue: "",
            quickSelectsSelectedValueForWeeks: "",
            quickSelectsSelectedValueForDays: "",
            selectedMonths: { [currentYear]: [] },
            selectedMonthForWeeks: currentMonth,
            selectedMonthForDays: currentMonth,
            selectedDays: { [currentYear]: [] },
            selectedWeeks: { [currentYear]: [] },
            selectedWeeksTaggingElement: { [currentYear]: [] },
            anchorYearsSelect: null,
            anchorYearsSelectForWeeks: null,
            anchorMonthSelectForWeeks: null,
            anchorYearsSelectForDays: null,
            anchorMonthSelectForDays: null,
            daysOfWeekValue: ["Days of Week"],
            transformX: -300,
            history: {
                  past: [{
                        timePeriodTogglerValue: "Weeks",
                        selectedYear: currentYear,
                        selectedYearForWeeks: currentYear,
                        selectedYearForDays: currentYear,
                        quickSelectsSelectedValue: "",
                        quickSelectsSelectedValueForWeeks: "",
                        quickSelectsSelectedValueForDays: "",
                        selectedMonths: { [currentYear]: [] },
                        selectedMonthForWeeks: currentMonth,
                        selectedMonthForDays: currentMonth,
                        selectedDays: { [currentYear]: [] },
                        selectedWeeks: { [currentYear]: [] },
                        selectedWeeksTaggingElement: { [currentYear]: [] },
                        anchorYearsSelect: null,
                        anchorYearsSelectForWeeks: null,
                        anchorMonthSelectForWeeks: null,
                        anchorYearsSelectForDays: null,
                        anchorMonthSelectForDays: null,
                        daysOfWeekValue: ["Days of Week"],
                        transformX: -300,
                  }],
                  current: []
            }
      }
      const [state, setState] = useState(initialState);
      const onTimePeriodChange = (evt, timePeriodTogglerValue) => {
            let transformX;
            if (timePeriodTogglerValue === "Months") {
                  transformX = 0
            } else if (timePeriodTogglerValue === "Weeks") {
                  transformX = -300
            } else {
                  transformX = -600
            }

            timePeriodTogglerValue && setState({ ...state, timePeriodTogglerValue, transformX });
      }
      const onQuickSelectsChange = evt => {
            if (undoRedoFlag) return;
            const selectedValue = evt.target.value;
            switch (selectedValue) {
                  case "Last Month": {
                        const selectedMonths = initialState.selectedMonths;
                        const quickSelectsSelectedValue = initialState.quickSelectsSelectedValue;
                        quickSelectsSelectedValue[currentYear] = selectedValue;
                        lastMonth.forEach(month => {
                              const scramble = month.split('_');
                              const listedMonth = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedMonths[listedYear]) || (selectedMonths[listedYear] = []);
                              selectedMonths[listedYear].push(listedMonth);
                        })
                        setState({
                              ...state,
                              quickSelectsSelectedValue,
                              selectedMonths,
                              selectedYear: currentYear
                        })
                        break;
                  }
                  case "Last 3 Months": {
                        const selectedMonths = initialState.selectedMonths;
                        const quickSelectsSelectedValue = selectedValue;

                        last3Months.forEach(month => {
                              const scramble = month.split('_');
                              const listedMonth = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedMonths[listedYear]) || (selectedMonths[listedYear] = []);
                              selectedMonths[listedYear].push(listedMonth);
                        })
                        setState({
                              ...state,
                              quickSelectsSelectedValue,
                              selectedMonths,
                              selectedYear: currentYear
                        })
                        break;
                  }
                  case "Last 6 Months": {
                        const selectedMonths = initialState.selectedMonths;
                        const quickSelectsSelectedValue = selectedValue;

                        last6Months.forEach(month => {
                              const scramble = month.split('_');
                              const listedMonth = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedMonths[listedYear]) || (selectedMonths[listedYear] = []);
                              selectedMonths[listedYear].push(listedMonth);
                        })
                        setState({
                              ...state,
                              quickSelectsSelectedValue,
                              selectedMonths,
                              selectedYear: currentYear
                        })
                        break;
                  }
                  case "Last 12 Months": {
                        const selectedMonths = initialState.selectedMonths;
                        const quickSelectsSelectedValue = selectedValue;

                        last12Months.forEach(month => {
                              const scramble = month.split('_');
                              const listedMonth = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedMonths[listedYear]) || (selectedMonths[listedYear] = []);
                              selectedMonths[listedYear].push(listedMonth);
                        });
                        setState({
                              ...state,
                              quickSelectsSelectedValue,
                              selectedMonths,
                              selectedYear: currentYear
                        })
                        break;
                  }
                  case "Last Week": {
                        const selectedWeeks = initialState.selectedWeeks;
                        const selectedWeeksTaggingElement = initialState.selectedWeeksTaggingElement;
                        const quickSelectsSelectedValueForWeeks = selectedValue;

                        lastWeek.forEach(month => {
                              const scramble = month.split('_');
                              const listedWeek = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedWeeks[listedYear]) || (selectedWeeks[listedYear] = []);
                              Array.isArray(selectedWeeksTaggingElement[listedYear]) || (selectedWeeksTaggingElement[listedYear] = []);
                              selectedWeeks[listedYear].push(listedWeek);
                              selectedWeeksTaggingElement[listedYear].push(`weeksRowContainer_${listedWeek}_${listedYear}`);
                        });
                        setState({
                              ...state,
                              quickSelectsSelectedValueForWeeks,
                              selectedWeeks,
                              selectedWeeksTaggingElement,
                              selectedMonthForWeeks: currentMonth,
                              selectedYearForWeeks: currentYear,
                        })
                        break;
                  }
                  case "Last 4 Weeks": {
                        const selectedWeeks = initialState.selectedWeeks;
                        const selectedWeeksTaggingElement = initialState.selectedWeeksTaggingElement;
                        const quickSelectsSelectedValueForWeeks = selectedValue;

                        last4Weeks.forEach(month => {
                              const scramble = month.split('_');
                              const listedWeek = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedWeeks[listedYear]) || (selectedWeeks[listedYear] = []);
                              Array.isArray(selectedWeeksTaggingElement[listedYear]) || (selectedWeeksTaggingElement[listedYear] = []);
                              selectedWeeks[listedYear].push(listedWeek);
                              selectedWeeksTaggingElement[listedYear].push(`weeksRowContainer_${listedWeek}_${listedYear}`);
                        });
                        setState({
                              ...state,
                              quickSelectsSelectedValueForWeeks,
                              selectedWeeks,
                              selectedWeeksTaggingElement,
                              selectedMonthForWeeks: currentMonth,
                              selectedYearForWeeks: currentYear,
                        })
                        break;
                  }
                  case "Last 13 Weeks": {
                        const selectedWeeks = initialState.selectedWeeks;
                        const selectedWeeksTaggingElement = initialState.selectedWeeksTaggingElement;
                        const quickSelectsSelectedValueForWeeks = selectedValue;

                        last13Weeks.forEach(month => {
                              const scramble = month.split('_');
                              const listedWeek = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedWeeks[listedYear]) || (selectedWeeks[listedYear] = []);
                              Array.isArray(selectedWeeksTaggingElement[listedYear]) || (selectedWeeksTaggingElement[listedYear] = []);
                              selectedWeeks[listedYear].push(listedWeek);
                              selectedWeeksTaggingElement[listedYear].push(`weeksRowContainer_${listedWeek}_${listedYear}`)
                        });
                        setState({
                              ...state,
                              quickSelectsSelectedValueForWeeks,
                              selectedWeeks,
                              selectedWeeksTaggingElement,
                              selectedMonthForWeeks: currentMonth,
                              selectedYearForWeeks: currentYear,
                        })
                        break;
                  }
                  case "Yesterday": {
                        const selectedDays = initialState.selectedDays;
                        const quickSelectsSelectedValueForDays = selectedValue;

                        yesterday.forEach(day => {
                              const scramble = day.split('_');
                              const listedDay = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedDays[listedYear]) || (selectedDays[listedYear] = []);
                              selectedDays[listedYear].push(listedDay);
                        });
                        setState({
                              ...state,
                              quickSelectsSelectedValueForDays,
                              selectedDays,
                              selectedMonthForWeeks: currentMonth,
                              selectedYearForWeeks: currentYear,
                        })
                        break;
                  }
                  case "Last 10 Days": {
                        const selectedDays = initialState.selectedDays;
                        const quickSelectsSelectedValueForDays = selectedValue;

                        last10Days.forEach(day => {
                              const scramble = day.split('_');
                              const listedDay = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedDays[listedYear]) || (selectedDays[listedYear] = []);
                              selectedDays[listedYear].push(listedDay);
                        });
                        setState({
                              ...state,
                              quickSelectsSelectedValueForDays,
                              selectedDays,
                              selectedMonthForWeeks: currentMonth,
                              selectedYearForWeeks: currentYear,
                        })
                        break;
                  }
                  case "Last 15 Days": {
                        const selectedDays = initialState.selectedDays;
                        const quickSelectsSelectedValueForDays = selectedValue;

                        last15Days.forEach(day => {
                              const scramble = day.split('_');
                              const listedDay = parseInt(scramble[0]);
                              const listedYear = parseInt(scramble[1]);

                              Array.isArray(selectedDays[listedYear]) || (selectedDays[listedYear] = []);
                              selectedDays[listedYear].push(listedDay);
                        });
                        setState({
                              ...state,
                              quickSelectsSelectedValueForDays,
                              selectedDays,
                              selectedMonthForWeeks: currentMonth,
                              selectedYearForWeeks: currentYear,
                        })
                        break;
                  }
                  default: {
                        if (state.timePeriodTogglerValue === "Months") {
                              const selectedMonths = initialState.selectedMonths;
                              const quickSelectsSelectedValue = initialState.quickSelectsSelectedValue;
                              quickSelectsSelectedValue = selectedValue;
                              selectedMonths[currentYear] = [currentMonth];
                              setState({
                                    ...state,
                                    quickSelectsSelectedValue,
                                    selectedMonths,
                                    selectedYear: currentYear
                              })
                        } else if (state.timePeriodTogglerValue === "Weeks") {
                              const selectedWeeks = initialState.selectedWeeks;
                              const selectedWeeksTaggingElement = initialState.selectedWeeksTaggingElement;
                              const quickSelectsSelectedValueForWeeks = initialState.quickSelectsSelectedValueForWeeks;
                              quickSelectsSelectedValueForWeeks = selectedValue;
                              selectedWeeks[currentYear] = [lastWeek]
                              selectedWeeksTaggingElement[currentYear][currentMonth] = [`weeksRowContainer_${lastWeek}`];
                              setState({
                                    ...state,
                                    quickSelectsSelectedValueForWeeks,
                                    selectedWeeks,
                                    selectedWeeksTaggingElement,
                                    selectedMonthForWeeks: currentMonth,
                                    selectedYearForWeeks: currentYear,
                              })
                        } else {
                              const selectedMonths = initialState.selectedMonths;
                              const quickSelectsSelectedValue = initialState.quickSelectsSelectedValue;
                              quickSelectsSelectedValue = selectedValue;
                              selectedMonths[currentYear] = [currentMonth];
                              setState({
                                    ...state,
                                    quickSelectsSelectedValue,
                                    selectedMonths,
                                    selectedYear: currentYear
                              })
                        }
                  }
            }
      }
      const onMonthSelect = (evt, month) => {
            if (undoRedoFlag) return;
            let quickSelectsSelectedValue = "";
            let selectedMonths = state.selectedMonths[state.selectedYear];

            if (!selectedMonths.includes(month)) {
                  selectedMonths.push(month);
            } else {
                  selectedMonths.splice(selectedMonths.indexOf(month), 1);
                  quickSelectsSelectedValue = updateQuickselectValue(state.selectedYear);
            }

            setState({
                  ...state,
                  selectedMonths: {
                        ...state.selectedMonths,
                        [state.selectedYear]: selectedMonths
                  },
                  quickSelectsSelectedValue
            });

      }
      const onWeekSelect = (evt, week) => {
            if (undoRedoFlag) return;
            let quickSelectsSelectedValueForWeeks = "";
            let selectedWeeks = state.selectedWeeks[state.selectedYearForWeeks];
            let selectedWeeksTaggingElement = state.selectedWeeksTaggingElement[state.selectedYearForWeeks];


            if (!selectedWeeks.includes(week)) {
                  selectedWeeks.push(week);
                  !selectedWeeksTaggingElement && (selectedWeeksTaggingElement = []);
                  selectedWeeksTaggingElement.push(evt.currentTarget.parentElement.id)
            } else {
                  selectedWeeks.splice(selectedWeeks.indexOf(week), 1);
                  selectedWeeksTaggingElement.splice(selectedWeeksTaggingElement.indexOf(evt.currentTarget.parentElement.id), 1);
                  quickSelectsSelectedValueForWeeks = updateQuickselectValueForWeeks(state.selectedYearForWeeks);
            }

            setState({
                  ...state,
                  selectedWeeks: {
                        ...state.selectedWeeks,
                        [state.selectedYearForWeeks]: selectedWeeks
                  },
                  quickSelectsSelectedValueForWeeks
            })
      }
      const onDaySelect = (evt, day) => {
            if (undoRedoFlag) return;
            let quickSelectsSelectedValueForDays = "";
            let selectedDays = state.selectedDays[state.selectedYearForDays];

            if (!selectedDays.includes(day)) {
                  selectedDays.push(day);
            } else {
                  selectedDays.splice(selectedDays.indexOf(day), 1);
                  quickSelectsSelectedValueForDays = updateQuickselectValueForDays(state.selectedYearForDays);
            }

            setState({
                  ...state,
                  selectedDays: {
                        ...state.selectedDays,
                        [state.selectedYearForDays]: selectedDays
                  },
                  quickSelectsSelectedValueForDays
            });
      }
      const onYearClick = evt => {
            if (undoRedoFlag) return;
            setState({ ...state, anchorYearsSelect: evt.currentTarget })
      }
      const onYearForWeeksClick = evt => {
            if (undoRedoFlag) return;
            setState({ ...state, anchorYearsSelectForWeeks: evt.currentTarget })
      }
      const onYearForDaysClick = evt => {
            if (undoRedoFlag) return;
            setState({ ...state, anchorYearsSelectForDays: evt.currentTarget })
      }
      const onYearSelectClose = () => {
            setState({ ...state, anchorYearsSelect: null })
      }
      const onYearSelectForWeeksClose = () => {
            setState({ ...state, anchorYearsSelectForWeeks: null })
      }
      const onYearSelectForDaysClose = () => {
            setState({ ...state, anchorYearsSelectForDays: null })
      }
      const onYearSelect = evt => {
            const selectedYear = evt.currentTarget.value;
            const selectedMonths = state.selectedMonths;

            !selectedMonths.hasOwnProperty(selectedYear) && (selectedMonths[selectedYear] = []);
            const quickSelectsSelectedValue = updateQuickselectValue(selectedYear);

            setState({
                  ...state,
                  selectedYear,
                  anchorYearsSelect: null,
                  quickSelectsSelectedValue,
                  selectedMonths
            })
      }
      const onYearSelectForWeeks = evt => {
            const selectedYear = evt.currentTarget.value;

            if (!state.selectedWeeks.hasOwnProperty(evt.currentTarget.value)) {
                  setState({
                        ...state,
                        selectedYearForWeeks: evt.currentTarget.value,
                        selectedWeeks: {
                              ...state.selectedWeeks,
                              [evt.currentTarget.value]: []
                        },
                        selectedWeeksTaggingElement: {
                              ...state.selectedWeeksTaggingElement,
                              [evt.currentTarget.value]: []
                        },
                        anchorYearsSelectForWeeks: null
                  })
            } else {
                  setState({
                        ...state,
                        selectedYearForWeeks: evt.currentTarget.value,
                        anchorYearsSelectForWeeks: null
                  })
            }
      }
      const onYearSelectForDays = evt => {
            setState({
                  ...state,
                  selectedYearForDays: evt.currentTarget.value,
                  anchorYearsSelectForDays: null
            })

      }
      const onDaysOfWeekMultiSelect = evt => {
            if (undoRedoFlag) return;
            let daysOfWeekValue = evt.target.value;

            if (daysOfWeekValue[0] === "Days of Week")
                  daysOfWeekValue.shift();
            else if (daysOfWeekValue.length === 0)
                  daysOfWeekValue.push("Days of Week")

            setState({
                  ...state,
                  daysOfWeekValue
            })
      }
      const onCalendarConfirmed = () => {
            const pastSelection = {
                  timePeriodTogglerValue: state.timePeriodTogglerValue,
                  selectedYear: state.selectedYear,
                  quickSelectsSelectedValue: state.quickSelectsSelectedValue,
                  selectedMonths: state.selectedMonths,
                  anchorYearsSelect: state.anchorYearsSelect,
                  daysOfWeekValue: state.daysOfWeekValue,
                  selectedYearForWeeks: state.selectedYearForWeeks,
                  quickSelectsSelectedValueForWeeks: state.quickSelectsSelectedValueForWeeks,
                  selectedMonthForWeeks: state.selectedMonthForWeeks,
                  selectedWeeks: state.selectedWeeks,
                  selectedWeeksTaggingElement: state.selectedWeeksTaggingElement,
                  anchorYearsSelectForWeeks: state.anchorYearsSelectForWeeks,
                  anchorMonthSelectForWeeks: state.anchorMonthSelectForWeeks,
                  transformX: state.transformX,
                  selectedYearForDays: state.selectedYearForDays,
                  quickSelectsSelectedValueForDays: state.quickSelectsSelectedValueForDays,
                  selectedMonthForDays: state.selectedMonthForDays,
                  selectedDays: state.selectedDays,
                  anchorYearsSelectForDays: state.anchorYearsSelectForDays,
                  anchorMonthSelectForDays: state.anchorMonthSelectForDays,
            }
            const past = state.history.past;
            const current = state.history.current;

            past.concat(current.reverse());
            past.push(pastSelection);

            setState({
                  ...pastSelection,
                  history: {
                        past,
                        current: []
                  }
            });
            calendarConfirmed(state, selectedSequence);
      }
      const onCalendarCancelled = () => {
            closeTimePeriodPopup();
      }
      const onUndo = () => {
            const past = state.history.past;
            const current = state.history.current;
            const previousState = past[past.length - 2];
            const nextState = past[past.length - 1];
            current.push(nextState)
            past.pop();
            setState({ ...previousState, history: { past, current } });
      }
      const onRedo = () => {
            const past = state.history.past;
            const current = state.history.current;
            const currentState = current[current.length - 1];
            past.push(currentState);
            current.pop();
            setState({ ...currentState, history: { past, current } });
      }
      const updateQuickselectValue = selectedYear => {
            if (isArrayEqual(state.selectedMonths[selectedYear], lastMonth.map(x => parseInt(x.split('_')[0])))) {
                  return "Last Month"
            } else if (isArrayEqual(state.selectedMonths[selectedYear], last3Months.map(x => parseInt(x.split('_')[0])))) {
                  return "Last 3 Months"
            } else if (isArrayEqual(state.selectedMonths[selectedYear], last6Months.map(x => parseInt(x.split('_')[0])))) {
                  return "Last 6 Months"
            } else if (isArrayEqual(state.selectedMonths[selectedYear], last12Months.map(x => parseInt(x.split('_')[0])))) {
                  return "Last 12 Months"
            } else {
                  return ""
            }
      }
      const updateQuickselectValueForWeeks = selectedYear => {
            if (isArrayEqual(state.selectedWeeks[selectedYear], lastWeek.map(x => parseInt(x.split('_')[0])))) {
                  return "Last Week"
            } else if (isArrayEqual(state.selectedWeeks[selectedYear], last4Weeks.map(x => parseInt(x.split('_')[0])))) {
                  return "Last 4 Weeks"
            } else if (isArrayEqual(state.selectedWeeks[selectedYear], last13Weeks.map(x => parseInt(x.split('_')[0])))) {
                  return "Last 13 Weeks"
            } else {
                  return ""
            }
      }
      const updateQuickselectValueForDays = selectedYear => {
            if (isArrayEqual(state.selectedDays[selectedYear], yesterday.map(x => parseInt(x.split('_')[0])))) {
                  return "Yesterday"
            } else if (isArrayEqual(state.selectedDays[selectedYear], last10Days.map(x => parseInt(x.split('_')[0])))) {
                  return "Last 10 Days"
            } else if (isArrayEqual(state.selectedDays[selectedYear], last15Days.map(x => parseInt(x.split('_')[0])))) {
                  return "Last 15 Days"
            } else {
                  return ""
            }
      }
      const GenerateChipsComponent = () => {
            if (state.timePeriodTogglerValue === "Months") {
                  const keys = Object.keys(state.selectedMonths);
                  return keys.sort((a, b) => b - a).map((year, itr, arr) => {
                        const selectedSequenceOfMonths = state.selectedMonths[year].sort((a, b) => a - b).reduce((arr, val, i, a) => {
                              if (!i || val !== a[i - 1] + 1) arr.push([]);
                              arr[arr.length - 1].push(val);
                              return arr;
                        }, []);
                        selectedSequence.selectedSequenceOfMonths[year] = selectedSequenceOfMonths;
                        selectedSequence.quickSelectsSelectedValue = state.quickSelectsSelectedValue.length > 0 ? state.quickSelectsSelectedValue : "";
                        const Chips = () => selectedSequenceOfMonths.map(monthArr => {
                              if (monthArr.length === 1) {
                                    return <Chip className={classes.selectedMonthsChip} label={monthNames[monthArr[0]]} />
                              } else if (monthArr.length === 2) {
                                    return (
                                          <Fragment>
                                                <Chip className={classes.selectedMonthsChip} label={monthNames[monthArr[0]]} />
                                                <Chip className={classes.selectedMonthsChip} label={monthNames[monthArr[1]]} />
                                          </Fragment>
                                    )
                              } else {
                                    return <Chip className={classes.selectedMonthsChip} label={`${monthNames[monthArr[0]]} - ${monthNames[monthArr[monthArr.length - 1]]}`} />
                              }
                        })

                        return (
                              <Fragment>
                                    <div className={classes.titleSelectedMonth}>{year}
                                    </div>
                                    <Chips />
                                    <Divider className={classes.divider} />
                              </Fragment>
                        )
                  })
            } else if (state.timePeriodTogglerValue === "Weeks") {
                  const keys = Object.keys(state.selectedWeeks);
                  return keys.sort((a, b) => b - a).map((year, itr, arr) => {
                        const MonthComponent = () => {
                              const selectedSequenceOfWeeks = state.selectedWeeks[year].sort((a, b) => a - b).reduce((arr, val, i, a) => {
                                    if (!i || val !== a[i - 1] + 1) arr.push([]);
                                    arr[arr.length - 1].push(val);
                                    return arr;
                              }, []);
                              selectedSequence.selectedSequenceOfWeeks[year] = selectedSequenceOfWeeks;
                              selectedSequence.quickSelectsSelectedValueForWeeks = state.quickSelectsSelectedValueForWeeks.length > 0 ? state.quickSelectsSelectedValueForWeeks : "";
                              return (
                                    <Fragment>
                                          {
                                                selectedSequenceOfWeeks.map(weeks => {
                                                      if (weeks.length === 1) {
                                                            return <Chip className={classes.selectedMonthsChip} label={weeks} />
                                                      } else if (weeks.length === 2) {
                                                            return (
                                                                  <Fragment>
                                                                        <Chip className={classes.selectedMonthsChip} label={weeks[0]} />
                                                                        <Chip className={classes.selectedMonthsChip} label={weeks[1]} />
                                                                  </Fragment>
                                                            )
                                                      } else {
                                                            return <Chip className={classes.selectedMonthsChip} label={`${weeks[0]} - ${weeks[weeks.length - 1]}`} />
                                                      }
                                                })
                                          }
                                    </Fragment>
                              )
                        }
                        return (
                              <Fragment>
                                    {
                                          state.selectedWeeks[year] && state.selectedWeeks[year].length > 0 &&
                                          <Fragment>
                                                <div className={classes.titleSelectedMonth}>{year}</div>
                                                <MonthComponent />
                                                <Divider className={classes.divider} />
                                          </Fragment>
                                    }
                              </Fragment>
                        )
                  })
            } else if (state.timePeriodTogglerValue === "Days") {
                  const keys = Object.keys(state.selectedDays);
                  return keys.sort((a, b) => b - a).map((year, itr, arr) => {
                        const MonthComponent = ({ year }) => {
                              const selectedSequenceOfDays = state.selectedDays[year].sort((a, b) => a - b).reduce((arr, val, i, a) => {
                                    if (!i || val !== a[i - 1] + 1) arr.push([]);
                                    arr[arr.length - 1].push(val);
                                    return arr;
                              }, []);
                              selectedSequence.selectedSequenceOfDays[year] = selectedSequenceOfDays;
                              selectedSequence.quickSelectsSelectedValueForDays = state.quickSelectsSelectedValueForDays.length > 0 ? state.quickSelectsSelectedValueForDays : "";
                              const getDate = (year, day) => new Date(year, 0, day).toLocaleDateString('en-GB', {
                                    day: 'numeric', month: 'short'
                              });
                              return (
                                    <Fragment>
                                          {
                                                selectedSequenceOfDays.map(days => {
                                                      if (days.length === 1) {
                                                            return <Chip className={classes.selectedMonthsChip} label={getDate(year, days)} />
                                                      } else if (days.length === 2) {
                                                            return (
                                                                  <Fragment>
                                                                        <Chip className={classes.selectedMonthsChip} label={getDate(year, days[0])} />
                                                                        <Chip className={classes.selectedMonthsChip} label={getDate(year, days[1])} />
                                                                  </Fragment>
                                                            )
                                                      } else {
                                                            return <Chip className={classes.selectedMonthsChip} label={`${getDate(year, days[0])} - ${getDate(year, days[days.length - 1])}`} />
                                                      }
                                                })
                                          }
                                    </Fragment>
                              )
                        }
                        return (
                              <Fragment>
                                    {
                                          state.selectedDays[year] && state.selectedDays[year].length > 0 &&
                                          <Fragment>
                                                <div className={classes.titleSelectedMonth}>{year}</div>
                                                <MonthComponent year={year} />
                                                <Divider className={classes.divider} />
                                          </Fragment>
                                    }
                              </Fragment>
                        )
                  })
            } else {
                  return []
            }
      }
      const onMonthSelectForWeeks = evt => {
            const selectedYearForWeeks = state.selectedWeeks[state.selectedYearForWeeks];

            if (!selectedYearForWeeks.hasOwnProperty(evt.currentTarget.value)) {
                  setState({
                        ...state,
                        selectedMonthForWeeks: evt.currentTarget.value,
                        anchorMonthSelectForWeeks: null,
                        // selectedWeeks: {
                        //       ...state.selectedWeeks,
                        //       [state.selectedYearForWeeks]: []
                        // },
                        // selectedWeeksTaggingElement: {
                        //       ...state.selectedWeeksTaggingElement,
                        //       [state.selectedYearForWeeks]: []
                        // },
                  })
            } else {
                  setState({
                        ...state,
                        selectedMonthForWeeks: evt.currentTarget.value,
                        anchorMonthSelectForWeeks: null,
                  })
            }
      }
      const onMonthSelectForDays = evt => {
            setState({
                  ...state,
                  selectedMonthForDays: evt.currentTarget.value,
                  anchorMonthSelectForDays: null
            });
      }
      const onMonthSelectForWeeksClick = evt => {
            if (undoRedoFlag) return;
            setState({ ...state, anchorMonthSelectForWeeks: evt.currentTarget })
      }
      const onMonthSelectForDaysClick = evt => {
            if (undoRedoFlag) return;
            setState({ ...state, anchorMonthSelectForDays: evt.currentTarget })
      }
      const onMonthSelectCloseForWeeks = () => {
            setState({ ...state, anchorMonthSelectForWeeks: null })
      }
      const onMonthSelectCloseForDays = () => {
            setState({ ...state, anchorMonthSelectForDays: null })
      }
      useEffect(() => {
            undoRedoFlag = state.history.current.length > 0;
      })
      return (
            <div className={classes.root}>
                  <div className={classes.container}>
                        <CalendarTogglerContainer
                              state={state}
                              classes={classes}
                              onTimePeriodChange={onTimePeriodChange}
                        />

                        <PreSelectionContainer
                              state={state}
                              classes={classes}
                              yearsItem={yearsItem}
                              monthNames={monthNames}
                              onYearClick={onYearClick}
                              quickSelects={quickSelects}
                              onYearSelect={onYearSelect}
                              monthNamesFull={monthNamesFull}
                              onYearSelectClose={onYearSelectClose}
                              onYearForDaysClick={onYearForDaysClick}
                              onYearSelectForDays={onYearSelectForDays}
                              onYearForWeeksClick={onYearForWeeksClick}
                              onMonthSelectForDays={onMonthSelectForDays}
                              onQuickSelectsChange={onQuickSelectsChange}
                              onYearSelectForWeeks={onYearSelectForWeeks}
                              onMonthSelectForWeeks={onMonthSelectForWeeks}
                              onYearSelectForDaysClose={onYearSelectForDaysClose}
                              onMonthSelectCloseForDays={onMonthSelectCloseForDays}
                              onMonthSelectForDaysClick={onMonthSelectForDaysClick}
                              onYearSelectForWeeksClose={onYearSelectForWeeksClose}
                              onMonthSelectForWeeksClick={onMonthSelectForWeeksClick}
                              onMonthSelectCloseForWeeks={onMonthSelectCloseForWeeks}
                        />
                        <SelectionContainer
                              state={state}
                              classes={classes}
                              monthNames={monthNames}
                              currentYear={currentYear}
                              onDaySelect={onDaySelect}
                              currentMonth={currentMonth}
                              onWeekSelect={onWeekSelect}
                              onMonthSelect={onMonthSelect}
                        />
                        <DaysOfWeekContainer
                              state={state}
                              onUndo={onUndo}
                              onRedo={onRedo}
                              classes={classes}
                              daysOfWeek={daysOfWeek}
                              onDaysOfWeekMultiSelect={onDaysOfWeekMultiSelect}
                        />
                        <ActionContainer
                              state={state}
                              classes={classes}
                              onCalendarCancelled={onCalendarCancelled}
                              onCalendarConfirmed={onCalendarConfirmed}
                        />
                  </div>
                  <div className={classes.selectedDateContainer}>
                        <GenerateChipsComponent />
                  </div>
            </div>
      )
})


/**
 * Adding a getWeek functionality to the current implementation of the new Date()
 */
Date.prototype.getWeek = function () {
      // Create a copy of this date object  
      var target = new Date(this.valueOf());

      // ISO week date weeks start on monday, so correct the day number  
      var dayNr = (this.getDay() + 6) % 7;

      // Set the target to the thursday of this week so the  
      // target date is in the right year  
      target.setDate(target.getDate() - dayNr + 2);

      // ISO 8601 states that week 1 is the week with january 4th in it  
      var jan4 = new Date(target.getFullYear(), 0, 4); // virtually changing it to the 1st jan

      // Number of days between target date and january 4th  
      var dayDiff = (target - jan4) / 86400000;

      if (new Date(target.getFullYear(), 0, 1).getDay() < 3) {
            // Calculate week number: Week 1 (january 4th) plus the    
            // number of weeks between target date and january 4th    
            return 1 + Math.ceil(dayDiff / 7);
      }
      else {  
            // jan 4th is on the next week (so next week is week 1)
            if(Math.abs(Math.ceil(dayDiff / 7)) === 0) {
                  return 53;
            } else {
                  return Math.ceil(dayDiff / 7);
            }
      }
}

Date.prototype.isLeapYear = function () {
      const year = this.getFullYear();
      if ((year & 3) != 0) return false;
      return ((year % 100) != 0 || (year % 400) == 0);
};

Date.prototype.getDayOfYear = function () {
      const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      const mn = this.getMonth();
      const dn = this.getDate();
      let dayOfYear = dayCount[mn] + dn;
      if (mn > 1 && this.isLeapYear()) dayOfYear++;
      return dayOfYear;
};