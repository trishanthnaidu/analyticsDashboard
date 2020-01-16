import { makeStyles } from "@material-ui/core/styles";

export const Styles = makeStyles(theme => ({
      "root": {

      },
      "projection": {
            display: "inline-block",
            verticalAlign: "middle"
      },
      "states": {
            outline: "none",
            zIndex: 1,
            cursor: "pointer",
            animation: theme.animation.bounceFast,

            "&#POK": {
                  transform: "scale(1.3,1.3) translate(-147.8px, -100.6px)",
                  fill: "#cfdfe6"
            },
            "&#Gilgit": {
                  transform: "scale(1.31,1.3) translate(-149.45px, -104.8px) rotateZ(0.4deg)",
                  fill: "#cfdfe6"
            },
            "&#id_16307": {
                  transform: "scale(2.9,3.9) translate(-381.35px, -207.11px)",
                  fill: "#fce5de",
                  zIndex: 0
            }
      },
}))