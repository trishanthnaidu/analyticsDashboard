import React from 'react';
import { MenuItem } from '../../Core';
import { SelectButton, SelectDropDown } from '../../Toolkit'

export const PreSelectsForMonth = ({
      state,
      classes,
      yearsItem,
      onYearClick,
      quickSelects,
      onYearSelect,
      onYearSelectClose,
      onQuickSelectsChange,
}) =>
      <div className={classes.preSelectsContainer} style={{ transform: `translateX(${state.transformX}px)` }}>
            <SelectButton
                  ButtonProps={{
                        color: "primary",
                        className: classes.btnYear,
                        onClick: onYearClick,
                  }}
                  MenuProps={{
                        anchorEl: state.anchorYearsSelect,
                        keepMounted: true,
                        open: Boolean(state.anchorYearsSelect),
                        onClose: onYearSelectClose,
                        PopoverClasses: {
                              paper: classes.popover_Paper
                        }
                  }}
                  MenuItems={
                        yearsItem.map(
                              item =>
                                    <MenuItem
                                          value={item}
                                          onClick={onYearSelect}
                                    >{item}</MenuItem>
                        )
                  }
            >{state.selectedYear}
            </SelectButton>
            <SelectDropDown
                  value={state.quickSelectsSelectedValue ? state.quickSelectsSelectedValue : ""}
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
      </div >
