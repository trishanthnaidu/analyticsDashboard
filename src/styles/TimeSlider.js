import { makeStyles } from "@material-ui/core/styles";

export const Styles = makeStyles(theme => ({
      root: {
            backgroundColor: theme.background["00"],
            padding: 10,
      },
      title: {
            color: theme.text[50],
            height: 40,
            textTransform: "capitalize",
            padding: 10,
            borderRadius: 5,
            backgroundColor: theme.background[10],
      },
      slider: {
            margin: "10px 13px 0",
            width: "90%"
      },
      rail: {
            height: 5,
            opacity: 0.5,
            marginTop: 2,
            borderRadius: 5,
            backgroundColor: theme.background[30]
      },
      track: {
            height: 5,
            marginTop: 2,
            borderRadius: 5,
      },
      mark: {
            height: 5,
            borderRadius: 5,
            width: 0,
      },
      valueLabel: {
            fontSize: 10,
            fontWeight: "bold",
            textAlign: "center",

            "& span:first-child": {
                  width: 60,
                  height: 25,
                  marginLeft: -13,
                  backgroundColor: theme.background[20],
                  transform: "none",
                  borderRadius: 5,

                  "& span": {
                        color: theme.text["00"],
                        width: 50,
                        height: 25,
                        margin: "13px 4px 0px",
                        backgroundColor: theme.background["none"],
                  }
            },
      },
      thumb: {
            width: 18,
            height: 18,
            border: `solid 3px ${theme.background["00"]}`
      }
}))