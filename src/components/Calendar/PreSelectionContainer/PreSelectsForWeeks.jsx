import React from 'react';
import { MenuItem } from '../../Core';
import { SelectButton, SelectDropDown } from '../../Toolkit'

export const PreSelectsForWeeks = ({
      state,
      classes,
      yearsItem,
      quickSelects,
      monthNamesFull,
      onYearForWeeksClick,
      onQuickSelectsChange,
      onYearSelectForWeeks,
      onMonthSelectForWeeks,
      onYearSelectForWeeksClose,
      onMonthSelectForWeeksClick,
      onMonthSelectCloseForWeeks,
}) => <div className={classes.preSelectsContainer} style={{ transform: `translateX(${state.transformX}px)` }}>
            <SelectButton
                  ButtonProps={{
                        color: "primary",
                        className: classes.btnYear,
                        onClick: onYearForWeeksClick
                  }}
                  MenuProps={{
                        anchorEl: state.anchorYearsSelectForWeeks,
                        open: Boolean(state.anchorYearsSelectForWeeks),
                        onClose: onYearSelectForWeeksClose,
                        PopoverClasses: {
                              paper: classes.popover_Paper
                        }
                  }}
                  MenuItems={
                        yearsItem.map(
                              item =>
                                    <MenuItem
                                          value={item}
                                          onClick={onYearSelectForWeeks}
                                    >{item}</MenuItem>
                        )
                  }
            >{state.selectedYearForWeeks}</SelectButton>
            <SelectButton
                  ButtonProps={{
                        color: "primary",
                        className: classes.btnYear,
                        onClick: onMonthSelectForWeeksClick
                  }}
                  MenuProps={{
                        anchorEl: state.anchorMonthSelectForWeeks,
                        open: Boolean(state.anchorMonthSelectForWeeks),
                        onClose: onMonthSelectCloseForWeeks,
                        PopoverClasses: {
                              paper: classes.popover_Paper
                        }
                  }}
                  MenuItems={
                        monthNamesFull.map(
                              (item, itr) =>
                                    <MenuItem
                                          value={itr}
                                          onClick={onMonthSelectForWeeks}
                                    >{item}</MenuItem>
                        )
                  }
            >{monthNamesFull[state.selectedMonthForWeeks]}</SelectButton>
            <SelectDropDown
                  value={state.quickSelectsSelectedValueForWeeks ? state.quickSelectsSelectedValueForWeeks : ""}
                  onChange={onQuickSelectsChange}
                  className={classes.quickSelect}
                  displayEmpty
                  disableUnderline
                  disabled={(state.history.current.length > 0)}
                  MenuProps={{
                        classes: {
                              paper: classes.popover_Paper,
                        }
                  }}
            >
                  {
                        quickSelects[state.timePeriodTogglerValue].map((item, itr) => {
                              if (itr === 0)
                                    return <MenuItem value="">{item}</MenuItem>
                              else
                                    return <MenuItem value={item}>{item}</MenuItem>
                        })
                  }
            </SelectDropDown>
      </div>