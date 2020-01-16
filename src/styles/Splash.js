import { createStyles } from "@material-ui/core/styles";

const desktop = theme => ({
      "root": {
            width: "100vw",
            boxSizing: "border-box",
            height: "100vh",
            display: "flex",
            zIndex: 0,
      },
      "loginPanel": {
            width: "40vw",
            height: "inherit",
            display: "inline-flex"
      },
      "loginContainer": {
            position: "absolute",
            left: "8%",
            top: "30%",
            width: "25%",
            animation: theme.animation.swayLTR,
            boxSizing: "border-box",
            textAlign: "center"
      },
      "newsFeedsContainer": {
            width: "60vw",
            height: "100%",
            overflowY: "hidden",
            display: "inline-flex",
            animation: theme.animation.swayRTL,
      },
      "logo": {
            width: "80%"
      },
      "desc": {
            display: "inline-block",
            color: theme.title.sub,
            fontSize: 14,
            marginTop: 20
      },
      "termsNConditionContainer": {
            marginTop: 50
      },
      "termsNConditionText": {
            display: "inline",
            color: theme.title.sub,
            fontSize: 14,
      },
      "termsAnchor": {
            color: theme.disney.color.primary,
            textDecoration: "underline",
            cursor: "pointer"
      },
      "checkboxError": {
            "& svg": {
                  color: theme.palette.error.main
            }
      },
      "buttonContainer": {
            marginTop: 10,
      },
      "starButton": theme.star.btn.splashNavigatoryBtn,
      "disneyButton": theme.disney.btn.splashNavigatoryBtn,
      "imgPrismDesc": {
            margin: "10% 7%",
            width: "85%"
      },
      "FooterContainer": {
            position: "absolute",
            bottom: 0,
            width: "100vw",
            height: 35,
            boxSizing: "border-box",
            padding: 5,
            backgroundColor: theme.background.footer
      },
      "footerSection": {
            display: "inline-block",
            width: "48vw",
            height: "inherit",
            textAlign: "center",
            fontSize: 13,

            "& span": {
                  verticalAlign: "middle",
                  color: theme.title.sub,

                  "& svg": {
                        fontSize: 20,
                        verticalAlign: "middle",
                        margin: "0 7px"
                  },
            }
      },
      "imgSlack": {
            height: 20,
            verticalAlign: "middle",
            margin: "0 7px"
      },
      [theme.breakpoints.down('sm')]: {
            "loginContainer": {
                  left: "8%",
                  top: "20%",
                  width: "35%"
            },
            "desc": { fontSize: 13 },
            "termsNConditionContainer": { marginTop: 25, },
            "termsNConditionText": { fontSize: 10 },
            "buttonContainer": { marginTop: 5 },
            "starButton": {
                  fontSize: 12,
                  height: 30,
                  padding: 5
            },
            "disneyButton": {
                  fontSize: 12,
                  height: 30,
            }
      },
      [theme.breakpoints.between('sm', 'md')]: {
            "loginContainer": { width: "35%" },
      }
})

const mobile = theme => ({
      ...desktop(theme),
      "imgPrismDesc": {
            margin: "10% 7%",
            width: "80%"
      },
      [theme.breakpoints.down('sm')]: {
            "root": {
                  display: "block"
            },
            "loginPanel": {
                  display: "block",
                  width: "100%",
                  height: "100vh"
            },
            "loginContainer": {
                  display: "block",
                  width: "100%",
                  left: -5,
                  textAlign: "center",
                  top: "25%",
                  position: "fixed",
                  padding: 5
            },
            "newsFeedsContainer": {
                  display: "none"
            },
            "prismUnderline": {
                  display: "none"
            },
            "desc": {
                  width: "80%",
                  fontSize: 15
            },
            "starButton": {
                  fontSize: 20,
                  height: 50,
                  padding: 7
            },
            "disneyButton": {
                  fontSize: 20,
                  height: 50,
                  padding: 7
            }
      },
      [theme.breakpoints.between('sm', 'md')]: {
            "desc": { fontSize: 20 },
            "termsNConditionText": { fontSize: 20 }
      }
})

export const Styles = theme => {
      const orientation = theme.isMobile ? getWindowOrientationForMobile() : getWindowOrientationForDesktop();
      if (orientation === 'landscape-primary') {
            return createStyles(desktop(theme))
      }
      else {
            return createStyles(mobile(theme))
      }
};

const getWindowOrientationForDesktop = () => window.screen.orientation.type
const getWindowOrientationForMobile = () => {
      switch (window.orientation) {
            case 0:
            case 180:
                  return "portrait-primary"
            case -90:
            case 90:
                  return "landscape-primary"
            default:
                  return "landscape-primary"
      }
}