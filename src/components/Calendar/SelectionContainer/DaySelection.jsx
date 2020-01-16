import React from 'react';
import { Button } from '../../Toolkit';

export const DaySelection = ({
      state,
      classes,
      onDaySelect,
      currentYear,
      currentMonth,
      getDaysInMonth
}) =>
      <div className={classes.daysContainer} style={{ transform: `translateX(${state.transformX}px)` }}>
            <div className={classes.daysRowContainerHeader}>
                  <span>S</span>
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
            </div>
            <DaysCalendarComponent
                  state={state}
                  classes={classes}
                  onDaySelect={onDaySelect}
                  currentYear={currentYear}
                  currentMonth={currentMonth}
                  getDaysInMonth={getDaysInMonth}
            />
      </div>


/**
 * Builds Calendar Body Component with Days
 * @borrows {Pickers.jsx}
 * @param {state} constructor Object
 * @param {classes} constructor Object
 * @param {onDaySelect} constructor function
 * @param {currentYear} destructor string
 * @param {currentMonth} destructor string 
 * @param {getDaysInMonth} destructor function
 */
const DaysCalendarComponent = ({ state, classes, onDaySelect, currentYear, currentMonth, getDaysInMonth }) => {
      const Component = [];
      let dayRowComponent = [];
      let daysInCurrentMonth = [];

      daysInCurrentMonth = getDaysInMonth(state.selectedMonthForDays, state.selectedYearForDays);
      const daysInPreviousMonth = state.selectedMonthForDays > 0 ? getDaysInMonth(state.selectedMonthForDays - 1, state.selectedYearForDays) : getDaysInMonth(11, state.selectedYearForDays - 1);
      const daysInComingMonth = state.selectedMonthForDays < 11 ? getDaysInMonth(state.selectedMonthForDays + 1, state.selectedYearForDays) : getDaysInMonth(0, state.selectedYearForDays + 1);
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
            const className = `${classes.dateCurrentMonth} 
                  ${
                  state.selectedDays[state.selectedYearForDays] &&
                  state.selectedDays[state.selectedYearForDays].includes(day.dayOfYear) &&
                  classes.daysSelected
                  }
            `;
            if (day.month === state.selectedMonthForDays) {
                  dayRowComponent.push(<Button component="span" onClick={evt => onDaySelect(evt, day.dayOfYear)} className={className}>{day.date}</Button>)
            } else {
                  dayRowComponent.push(<Button component="span" className={classes.dateNotCurrentMonth}>{day.date}</Button>)
            }
            if (day.day === 7) {
                  Component.push(
                        <div className={classes.daysRowContainer}>
                              {dayRowComponent}
                        </div>
                  );
                  dayRowComponent = [];
            }
      })
      return Component;
}