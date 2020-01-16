import React from 'react';
import { MenuItem } from '../../Core';
import { SelectButton, SelectDropDown } from '../../Toolkit'

export const PreSelectsForDays = ({
      state,
      classes,
      yearsItem,
      quickSelects,
      monthNamesFull,
      onYearForDaysClick,
      onYearSelectForDays,
      onQuickSelectsChange,
      onMonthSelectForDays,
      onYearSelectForDaysClose,
      onMonthSelectForDaysClick,
      onMonthSelectCloseForDays,
}) =>
      <div className={classes.preSelectsContainer} style={{ transform: `translateX(${state.transformX}px)` }}>
            <SelectButton
                  ButtonProps={{
                        color: "primary",
                        className: classes.btnYear,
                        onClick: onYearForDaysClick
                  }}
                  MenuProps={{
                        anchorEl: state.anchorYearsSelectForDays,
                        open: Boolean(state.anchorYearsSelectForDays),
                        onClose: onYearSelectForDaysClose,
                        PopoverClasses: {
                              paper: classes.popover_Paper
                        }
                  }}
                  MenuItems={
                        yearsItem.map(
                              item =>
                                    <MenuItem
                                          value={item}
                                          onClick={onYearSelectForDays}
                                    >{item}</MenuItem>
                        )
                  }
            >{state.selectedYearForDays}</SelectButton>
            <SelectButton
                  ButtonProps={{
                        color: "primary",
                        className: classes.btnYear,
                        onClick: onMonthSelectForDaysClick
                  }}
                  MenuProps={{
                        anchorEl: state.anchorMonthSelectForDays,
                        open: Boolean(state.anchorMonthSelectForDays),
                        onClose: onMonthSelectCloseForDays,
                        PopoverClasses: {
                              paper: classes.popover_Paper
                        }
                  }}
                  MenuItems={
                        monthNamesFull.map(
                              (item, itr) =>
                                    <MenuItem
                                          value={itr}
                                          onClick={onMonthSelectForDays}
                                    >{item}</MenuItem>
                        )
                  }
            >{monthNamesFull[state.selectedMonthForDays]}</SelectButton>
            <SelectDropDown
                  value={state.quickSelectsSelectedValueForDays ? state.quickSelectsSelectedValueForDays : ""}
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