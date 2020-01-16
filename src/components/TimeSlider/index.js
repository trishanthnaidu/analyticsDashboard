import React from 'react';
import { Styles } from '../../styles/TimeSlider';
import { Slider, Typography } from '../Core';

export const TimeSlider = ({ onTimeSlotChange }) => {
      const minRange = 2;
      const maxRange = 26;
      const step = 0.5;
      const classes = Styles();
      const [value, setValue] = React.useState([minRange, maxRange]);
      const handleChange = (evt, newValue) => {
            setValue(newValue);
      };
      const onChangeCommitted = (evt, newValue) => {
            onTimeSlotChange(`${valueLabelFormat(newValue[0])} - ${valueLabelFormat(newValue[1])}`);
      }
      const valueLabelFormat = value => {
            let currentValue = "";
            if (value > 12 && value < 24) {
                  currentValue = (value - 12).toString();
                  if (currentValue.indexOf(".") !== -1) {
                        return currentValue.replace(".5", ".30 PM");
                  } else {
                        return currentValue.concat(".00 PM");
                  }
            } else if (value >= 24 && value !== 26) {
                  currentValue = (value - 24).toString();
                  if (currentValue.indexOf(".") !== -1) {
                        return currentValue.replace(".5", ".30 AM");
                  } else {
                        return currentValue.concat(".00 AM");
                  }
            } else if (value === 26) {
                  return currentValue.concat("1:59 AM");
            } else {
                  currentValue = value.toString();
                  if (currentValue.indexOf(".") !== -1) {
                        return currentValue.replace(".5", ".30 AM");
                  } else {
                        return currentValue.concat(".00 AM");
                  }
            }
      };
      return (
            <div className={classes.root}>
                  <Typography gutterBottom className={classes.title}>
                        Time Slots
                  </Typography>
                  <Slider
                        className={classes.slider}
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={onChangeCommitted}
                        valueLabelFormat={valueLabelFormat}
                        valueLabelDisplay="auto"
                        step={step}
                        marks
                        min={minRange}
                        max={maxRange}
                        classes={{
                              thumb: classes.thumb,
                              rail: classes.rail,
                              track: classes.track,
                              mark: classes.mark,
                              valueLabel: classes.valueLabel
                        }}
                  />
            </div>
      )
}