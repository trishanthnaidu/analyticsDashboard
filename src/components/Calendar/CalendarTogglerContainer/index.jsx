import React from 'react';
import Paper from "@material-ui/core/Paper";
import { ToggleButtonGroupArray } from '../../Toolkit';

export const CalendarTogglerContainer = ({
      state,
      onTimePeriodChange,
      classes,
}) =>
      <Paper elevation={0} className={classes.toggleButtonGroupContainer}>
            <ToggleButtonGroupArray
                  size="small"
                  value={state.timePeriodTogglerValue}
                  exclusive
                  onChange={onTimePeriodChange}
                  classes={{
                        root: classes.toggleButtonGroup_Root,
                        grouped: classes.toggleButtonGroup_Grouped
                  }}
                  toggleButtonArrayContents={[{
                        key: 1,
                        children: "Months",
                        value: "Months",
                        className: classes.toggleButton
                  }, {
                        key: 2,
                        children: "Weeks",
                        value: "Weeks",
                        className: classes.toggleButton
                  }, {
                        key: 3,
                        children: "Days",
                        value: "Days",
                        className: classes.toggleButton
                  }]}
            />
      </Paper >