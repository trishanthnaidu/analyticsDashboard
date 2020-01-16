import React from 'react';
import { Button, ToggleButton } from '../../Toolkit';

export const WeekSelection = ({
      state,
      classes,
      monthNames,
      currentYear,
      onWeekSelect,
      currentMonth,
      onMonthSelect,
      getDaysInMonth
}) =>
      < div className={classes.weeksContainer} style={{ transform: `translateX(${state.transformX}px)` }}>
            <div className={classes.weeksRowContainerHeader}>
                  <span>W</span>
                  <span>S</span>
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
            </div>
            <WeekCalendarComponent
                  state={state}
                  classes={classes}
                  onWeekSelect={onWeekSelect}
                  currentYear={currentYear}
                  currentMonth={currentMonth}
                  getDaysInMonth={getDaysInMonth}
            />
      </div>


/**
* Builds Calendar Body Component with Days
* @borrows {Pickers.jsx}
* @param {state} destructor Object
* @param {classes} destructor Object
* @param {onWeekSelect} destructor function
* @param {currentYear} destructor string
* @param {currentMonth} destructor string 
* @param {getDaysInMonth} destructor function
*/
const WeekCalendarComponent = ({ state, classes, onWeekSelect, currentYear, currentMonth, getDaysInMonth }) => {
      const Component = [];
      let dayRowComponent = [];
      let daysInCurrentMonth = [];
      let weekCount = 0;

      daysInCurrentMonth = getDaysInMonth(state.selectedMonthForWeeks, state.selectedYearForWeeks);
      const daysInPreviousMonth = state.selectedMonthForWeeks > 0 ? getDaysInMonth(state.selectedMonthForWeeks - 1, state.selectedYearForWeeks) : getDaysInMonth(11, state.selectedYearForWeeks - 1);
      const daysInComingMonth = state.selectedMonthForWeeks < 11 ? getDaysInMonth(state.selectedMonthForWeeks + 1, state.selectedYearForWeeks) : getDaysInMonth(0, state.selectedYearForWeeks + 1);
      const initialDayOfTheCurrentMonth = daysInCurrentMonth[0].day;
      const lengthOfPreviousDaysRequired = initialDayOfTheCurrentMonth - 1;
      const endDayOfCurrentMonth = daysInCurrentMonth[daysInCurrentMonth.length - 1].day;
      const lengthOfComingDaysRequired = 7 - endDayOfCurrentMonth;

      if (lengthOfPreviousDaysRequired > 0) {
            const daysInPreviousMonthToBeAdded = daysInPreviousMonth.splice(daysInPreviousMonth.length - lengthOfPreviousDaysRequired, daysInPreviousMonth.length - 1);
            daysInCurrentMonth = daysInPreviousMonthToBeAdded.concat(daysInCurrentMonth);
      }
      if (lengthOfComingDaysRequired > 0 && lengthOfComingDaysRequired < 7) {
            const daysInComingMonthToBeAdded = daysInComingMonth.splice(0, lengthOfComingDaysRequired);
            daysInCurrentMonth = daysInCurrentMonth.concat(daysInComingMonthToBeAdded);
      }
      daysInCurrentMonth.forEach((day, itr) => {
            debugger;
            let classNameMarkedRow, markSelected;
            if (day.week === 53) {
                  markSelected = (
                        (state.selectedWeeks[state.selectedYearForWeeks] && state.selectedWeeks[state.selectedYearForWeeks].includes(day.week)) ||
                        (state.selectedWeeks[state.selectedYearForWeeks - 1] && state.selectedWeeks[state.selectedYearForWeeks - 1].includes(day.week))
                  )
                  classNameMarkedRow = `${classes.weeksRowContainer} 
                  ${
                        markSelected &&
                        classes.weekRowSelected
                  }`;
            } else {
                  markSelected = (
                        state.selectedWeeks[state.selectedYearForWeeks] &&
                        state.selectedWeeks[state.selectedYearForWeeks].includes(day.week)
                  )
                  classNameMarkedRow = `${classes.weeksRowContainer} 
                        ${
                        markSelected &&
                        classes.weekRowSelected
                        }`;
            }

            if (day.month === state.selectedMonthForWeeks) {
                  dayRowComponent.push(<Button component="span" onClick={evt => onWeekSelect(evt, parseInt(evt.currentTarget.parentElement.parentElement.firstElementChild.value))} className={classes.dateCurrentMonth}>{day.date}</Button>)
            } else {
                  dayRowComponent.push(<Button component="span" className={classes.dateNotCurrentMonth}>{day.date}</Button>)
            }
            if (day.day === 7) {
                  weekCount = day.week;
                  Component.push(
                        <div>
                              <ToggleButton
                                    value={day.week}
                                    className={classes.weekRowNumber}
                                    selected={markSelected}
                                    onChange={onWeekSelect}
                              >
                                    {day.week}
                              </ToggleButton>
                              <span className={classNameMarkedRow} id={`weeksRowContainer_${day.week}_${day.year}`} >
                                    {dayRowComponent}
                              </span>
                        </div>
                  );
                  dayRowComponent = [];
            }
      })
      return Component;
}