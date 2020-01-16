import React from 'react';
import { ToggleButton } from '../../Toolkit';

export const MonthSelection = ({
      state,
      classes,
      monthNames,
      currentYear,
      onWeekSelect,
      currentMonth,
      onMonthSelect,
      getDaysInMonth
}) =>
      <div className={classes.monthsContainer} style={{ transform: `translateX(${state.transformX}px)` }}>
            <div className={classes.monthRowContainer}>
                  <ToggleButton value={0} selected={state.selectedMonths[state.selectedYear].includes(0)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "JAN"}>JAN</ToggleButton>
                  <ToggleButton value={1} selected={state.selectedMonths[state.selectedYear].includes(1)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "FEB"}>FEB</ToggleButton>
                  <ToggleButton value={2} selected={state.selectedMonths[state.selectedYear].includes(2)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "MAR"}>MAR</ToggleButton>
            </div>
            <div className={classes.monthRowContainer}>
                  <ToggleButton value={3} selected={state.selectedMonths[state.selectedYear].includes(3)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "APR"}>APR</ToggleButton>
                  <ToggleButton value={4} selected={state.selectedMonths[state.selectedYear].includes(4)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "MAY"}>MAY</ToggleButton>
                  <ToggleButton value={5} selected={state.selectedMonths[state.selectedYear].includes(5)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "JUN"}>JUN</ToggleButton>
            </div>
            <div className={classes.monthRowContainer}>
                  <ToggleButton value={6} selected={state.selectedMonths[state.selectedYear].includes(6)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "JUL"}>JUL</ToggleButton>
                  <ToggleButton value={7} selected={state.selectedMonths[state.selectedYear].includes(7)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "AUG"}>AUG</ToggleButton>
                  <ToggleButton value={8} selected={state.selectedMonths[state.selectedYear].includes(8)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "SEP"}>SEP</ToggleButton>
            </div>
            <div className={classes.monthRowContainer}>
                  <ToggleButton value={9} selected={state.selectedMonths[state.selectedYear].includes(9)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "OCT"}>OCT</ToggleButton>
                  <ToggleButton value={10} selected={state.selectedMonths[state.selectedYear].includes(10)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "NOV"}>NOV</ToggleButton>
                  <ToggleButton value={11} selected={state.selectedMonths[state.selectedYear].includes(11)} onChange={onMonthSelect} disabled={state.selectedYear === currentYear && monthNames[currentMonth] === "DEC"}>DEC</ToggleButton>
            </div>
      </div>