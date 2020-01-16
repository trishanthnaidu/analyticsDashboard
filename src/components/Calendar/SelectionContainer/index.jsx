import React from 'react';
import { DaySelection } from './DaySelection';
import { WeekSelection } from './WeekSelection';
import { MonthSelection } from './MonthSelection';

/**
 * MonthSelection
 * @extends {*} MonthSelection_I 
 * @param {*} props Object
 */
export const SelectionContainer =
      props =>
            <div className={props.classes.monthContainerWrapper}>
                  {/** Months Selection Container */}
                  <MonthSelection {...props} getDaysInMonth={getDaysInMonth} />

                  {/** Weeks Selection Container */}
                  <WeekSelection {...props} getDaysInMonth={getDaysInMonth} />

                  {/** Days Selection Container */}
                  <DaySelection {...props} getDaysInMonth={getDaysInMonth} />

            </div>


/**
 * BARC Format Days starting from Saturday - Friday
 * @borrows {Pickers.jsx}
 * @param {number} month 
 * @param {number} year 
 */
const getDaysInMonth = (month, year) => {
      const date = new Date(Date.UTC(year, month, 1));
      const days = [];
      while (date.getMonth() === month) {
            const currDate = new Date(date);
            days.push({
                  date: currDate.getDate(),
                  day: currDate.getDay() + 2,
                  year: currDate.getUTCFullYear(),
                  month: currDate.getUTCMonth(),
                  week: currDate.getWeek(),
                  dayOfYear: currDate.getDayOfYear(),
            });
            date.setDate(date.getDate() + 1);
      }
      return days;
}