import React, { useState } from 'react';
import { AppHeader } from "./AppHeader";
import { AppDrawer } from "./AppDrawer";
import { Playground } from './Playground';
import { Styles } from "../styles/Master";
import { AppTheme } from '../theme/App';
import CssBaseline from "@material-ui/core/CssBaseline";

const defaultTheme = "light";

export const Master = () => {
      const [theme, setTheme] = useState(defaultTheme);
      return (
            <AppTheme theme={theme} forComponent="APP">
                  <MasterComponent setTheme={setTheme} />
            </AppTheme>
      )
}

const MasterComponent = props => {
      const classes = Styles();
      return (
            <div className={classes.root} >
                  <CssBaseline />
                  <AppHeader {...props} />
                  <AppDrawer />
                  <Playground />
            </div>
      )
}