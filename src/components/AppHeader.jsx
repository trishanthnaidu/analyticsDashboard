import React, { useState } from 'react';
import { Styles } from "../styles/AppHeader";
import logo from '../assets/images/logo.svg';
import logoDark from '../assets/images/logoDark.svg';
import {
      Switch,
      Brightness3Rounded,
      Brightness7Rounded,
      useTheme,
      SearchRounded,
      TrackChangesRounded,
      InputBase,
      Typography,
      IconButton,
      Toolbar,
      AppBar,
      Tooltip
} from './Core';

export const AppHeader = ({ setTheme }) => {
      const classes = Styles();
      const theme = useTheme();
      const isLight = theme.theme === "light";
      const onThemeChange = evt => {
            setTheme(evt.target.checked ? "dark" : "light");
      }
      return (
            <div className={classes.root}>
                  <AppBar position="fixed" color="primary" className={classes.appBar}>
                        <Toolbar variant="dense">
                              <div className={classes.logoContainer}>
                                    <img className={classes.logo} src={isLight ? logo : logoDark} alt="logo" />
                              </div>
                              <Tooltip title={`toggle to ${theme.theme === "light" ? "dark" : "light"} theme`} >
                                    <Switch
                                          className={classes.checkbox}
                                          checked={!isLight}
                                          onChange={onThemeChange}
                                          color="primary"
                                          size="small"
                                          icon={<Brightness3Rounded className={classes.themeTogglerDay} />}
                                          checkedIcon={<Brightness7Rounded className={classes.themeTogglerNight} />}
                                          classes={{
                                                track: classes.checkBoxTrack
                                          }}
                                    />
                              </Tooltip>
                              {/* <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                          <SearchRounded />
                                    </div>
                                    <InputBase
                                          placeholder="Search…"
                                          classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                          }}
                                          inputProps={{ 'aria-label': 'search' }}
                                    />
                              </div> */}
                        </Toolbar>
                  </AppBar>
            </div>
      );
}
