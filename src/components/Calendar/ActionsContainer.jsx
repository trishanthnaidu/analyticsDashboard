import React from 'react';
import { Button} from '../Toolkit';

export const ActionContainer = ({
      state,
      classes,
      onCalendarConfirmed,
      onCalendarCancelled,
}) =>
      <div className={classes.btnActionContainer}>
            <Button
                  color="primary"
                  onClick={onCalendarCancelled}
            >Cancel</Button>
            <Button
                  color="primary"
                  onClick={onCalendarConfirmed}
                  disabled={(state.history.current.length > 0)}
            >Ok</Button>
      </div>