import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
      splashTheme,
      starColorCode,
      extendBtn,
      onHover,
      primaryBtn
} from "./Splash";

const UNIVERSAL_FONT_SIZE = 12;

const appTheme = (theme, forComponent) => {
      const collections = {
            light: {
                  theme: "light",
                  palette: {
                        primary: {
                              main: starColorCode,
                        },
                        secondary: {
                              main: "#eee"
                        }
                  },
                  text: {
                        "00": "#000",
                        "10": "#222",
                        "20": "#444",
                        "30": "#666",
                        "40": "#888",
                        "50": "#aaa",
                        "60": "#ccc",
                        "70": "#ddd",
                        "80": "#eee",
                        "90": "#fafafa"
                  },
                  drawer: "rgba(0, 0, 0, 0.12)",
                  hover: {
                        "10": "rgba(0,0,0,0.14)"
                  },
                  background: {
                        "00": "#fff",
                        "10": "#fafafa",
                        "20": "#eee",
                        "30": "#e2e2e2",
                        "none": "transparent"
                  },
                  reverse: {
                        background: {
                              "00": "#0f0f1e",
                              "10": "#18192e",
                              "20": "#27283c",
                              "30": "#363844",
                              "none": "transparent"
                        },
                  }
            },
            dark: {
                  theme: "dark",
                  palette: {
                        primary: {
                              main: starColorCode,
                        },
                        secondary: {
                              main: "#33313a"
                        }
                  },
                  text: {
                        "00": "#fff",
                        "10": "#fafafa",
                        "20": "#eee",
                        "30": "#ddd",
                        "40": "#bbb",
                        "50": "#888",
                        "60": "#666",
                        "70": "#555",
                        "80": "#444",
                        "90": "#222"
                  },
                  drawer: "rgba(255, 255, 255, 0.12)",
                  hover: {
                        "10": "rgba(255,255,255,0.14)"
                  },
                  background: {
                        "00": "#0f0f1e",
                        "10": "#18192e",
                        "20": "#27283c",
                        "30": "#363844",
                        "none": "transparent"
                  },
                  reverse: {
                        background: {
                              "00": "#fff",
                              "10": "#fafafa",
                              "20": "#eee",
                              "30": "#e2e2e2",
                              "none": "transparent"
                        },
                  },
            }
      }

      const commonTheme = selectedTheme => ({
            divider: {
                  backgroundColor: collections[selectedTheme].text[80],
                  margin: "7px 12px 5px"
            },
            verticalDivider: {
                  backgroundColor: collections[selectedTheme].text[80],
            },
            animation: {
                  bounce: "bounce 400ms linear both",
                  bounceFast: "bounce 150ms ease-out both",
                  swayRTL: "swayLeftToRight 1000ms linear both",
                  swayLTR: "swayRightToLeft 1000ms linear both",
                  eyeBlink: "eyeBlink 4800ms linear infinite both",
                  appearBTT: "appearBTT 0.7s ease-in both;",
            },
            ellipsis: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
            },
            checkbox: {
                  "& .MuiButtonBase-root": {
                        color: collections[selectedTheme].text[50]
                  },
                  "& .Mui-checked": {
                        color: collections[selectedTheme].palette.primary.main
                  }
            },
            typography: {
                  fontFamily: [
                        '"cadiz-regular"',
                        'Roboto',
                        '"Helvetica Neue"',
                        'Arial',
                        'sans-serif',
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"'
                  ],
                  body1: {
                        fontSize: UNIVERSAL_FONT_SIZE
                  },
                  h5: {
                        fontSize: 15
                  }
            },
            btn: {
                  primary: {
                        ...primaryBtn,
                        fontSize: UNIVERSAL_FONT_SIZE,
                        padding: "5px 15px"
                  },
                  primaryNoHover: {
                        ...extendBtn,
                        fontSize: UNIVERSAL_FONT_SIZE,
                        padding: "5px 15px"

                  }
            },
            icons: {
                  size: {
                        primary: {
                              fontSize: 18
                        }
                  }
            },
            shadow: {
                  "00": "1px 1px 5px 2px rgba(0,0,0,0.1)",
                  "10": "1px 1px 5px 2px rgba(0,0,0,0.2)"
            }
      })

      if (forComponent === "SPLASH") {
            return createMuiTheme(splashTheme);
      } else if (forComponent === "APP") {
            if (theme === "light" || theme === "dark")
                  return createMuiTheme({ ...commonTheme(theme), ...collections[theme] });
            else
                  return createMuiTheme({ ...commonTheme(theme), ...collections["light"] });
      }
}

export const AppTheme = ({ children, theme, forComponent }) => <ThemeProvider theme={appTheme(theme, forComponent)}>{children}</ThemeProvider>