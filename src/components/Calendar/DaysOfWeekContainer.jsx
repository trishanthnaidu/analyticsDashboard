import React from 'react';
import {
      Select,
      MenuItem,
      IconButton,
      Checkbox,
      ListItemText,
      Tooltip
} from '@material-ui/core';

import {
      UndoRounded as UndoRoundedIcon,
      RedoRounded as RedoRoundedIcon
} from '@material-ui/icons';

export const DaysOfWeekContainer = ({
      state,
      onUndo,
      onRedo,
      classes,
      daysOfWeek,
      onDaysOfWeekMultiSelect,
}) =>
      <div className={classes.daysOfWeekContainer}>
            <Tooltip title="past selections">
                  <IconButton
                        color="primary"
                        className={classes.btnYear}
                        onClick={onUndo}
                        size="small"
                        disabled={!(state.history.past.length > 1)}
                  ><UndoRoundedIcon />
                  </IconButton>
            </Tooltip>
            <Tooltip title="current selections">
                  <IconButton
                        color="primary"
                        className={classes.btnYear}
                        onClick={onRedo}
                        size="small"
                        disabled={!(state.history.current.length > 0)}
                  ><RedoRoundedIcon />
                  </IconButton>
            </Tooltip>
            <Select
                  value={state.daysOfWeekValue}
                  onChange={onDaysOfWeekMultiSelect}
                  className={classes.daysOfWeek}
                  multiple
                  disableUnderline
                  disabled={(state.history.current.length > 0)}
                  MenuProps={{
                        classes: {
                              paper: classes.popover_daysOfWeekPaper
                        }
                  }}
                  renderValue={selected => selected.join(', ')}
            >
                  {
                        daysOfWeek.map((day, itr) => {
                              if (itr === 0) {
                                    return (
                                          <MenuItem value="" disabled>{day}
                                          </MenuItem>
                                    )
                              }
                              else {
                                    return (
                                          <MenuItem value={day} className={classes.daysOfWeekMenu}>
                                                <Checkbox color="primary" checked={state.daysOfWeekValue.indexOf(day) > -1} className={classes.daysOfWeekCheckbox}/>
                                                <ListItemText primary={day} />
                                          </MenuItem>
                                    )
                              }
                        })
                  }
            </Select>
      </div>