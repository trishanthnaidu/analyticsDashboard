import { makeStyles } from "@material-ui/core/styles";

export const Styles = makeStyles(theme => ({
      "root": {
            width: "82vw",
            height: "100vh",
            padding: 10,
            boxSizing: "border-box",
            display: "inline-flex",
            marginTop: 50
      },
      "wholeMapContainer": {
            width: "75vw",
            height: "100vh",
            display: "inline-block",
            boxSizing: "border-box",
            padding: "0 10px"
      },
      "title": {
            marginBottom: 5,
            color: theme.text[40]
      },
      "detailMapContainer": {
            width: "47vw",
            height: "97%",
            display: "inline-block",
            backgroundColor: theme.background[30],
            margin: 10,
            boxSizing: "border-box"
      },
      "detailStateDivision": {
            height: "44vh",
            backgroundColor: "#f6f6f6",
            border: "solid #fff 10px",
            padding: 5
      },
      popover_Paper: {
            backgroundColor: theme.background[20],
            color: theme.text[30],
      },
      btnRegion: {
            textTransform: "capitalize",
            fontSize: 13,
            color: theme.text[20]
      },
      divider: theme.divider,
      subHeader: {
            backgroundColor: theme.background[20],
            lineHeight: "35px",
            color: theme.palette.primary.main,
            fontFamily: "cadiz-bold",
      },
      gridBtn: {
            margin: "2px 0 2px"
      },
      verticalDivider: {
            backgroundColor: theme.text[20],
            marginRight: 5,
            height: 20
      }
}));