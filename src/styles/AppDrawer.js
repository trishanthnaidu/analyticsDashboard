import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = "18%";

export const Styles = makeStyles(theme => ({
      root: {
            display: 'flex',
      },
      toolbar: {
            minHeight: 50
      },
      drawer: {
            width: drawerWidth,
            flexShrink: 0,
            backgroundColor: theme.drawer,
      },
      divider: theme.divider,
      verticalDivider: {
            height: 28,
            margin: 4,
      },
      drawerPaper: {
            width: drawerWidth,
            backgroundColor: theme.background["00"],
            color: theme.text[50],
            borderRight: "transparent"
      },
      listItemLabelButton: {
            cursor: "pointer",
            color: theme.palette.primary.main,
            paddingLeft: 11
      },
      listSubHeader: {
            color: theme.text[50],
            margin: 6,
      },
      autocompleteContainer: {
            margin: "0 4px",
            width: "95%"
      },
      autocomplete: {
            "& .MuiOutlinedInput-notchedOutline": {
                  border: "none"
            },
            "& .MuiIconButton-label": {
                  color: theme.text[50]
            }
      },
      autocompleteLabel: {
            color: theme.text[50]
      },
      textField: {
            margin: "15px 0 2px",
            "& input": {
                  color: theme.text[20],
                  fontSize: theme.typography.body1.fontSize
            }
      },
      dropDownPopupContainer: {
            backgroundColor: theme.background[20],
            color: theme.text[30],
      },
      dateIcon: {
            color: theme.palette.primary.main,
            backgroundColor: theme.background["10"],
            "&:hover": {
                  backgroundColor: theme.background["20"],
            }
      },
      icons: {
            color: theme.text[10],
            minWidth: 32,
            margin: "0 12px",
            marginLeft: "auto"
      },
      iconSvg: {
            ...theme.icons.size.primary,
            color: theme.palette.primary.main,
            cursor: "pointer",
      },
      timePeriodInputBase: {
            display: "inline-block",
            fontSize: theme.typography.body1.fontSize,
            ...theme.ellipsis,

            "&.Mui-disabled": {
                  color: theme.text[30],
            },
      },
      timePeriodPaperPopup: {
            "& ul.MuiList-root": {
                  padding: 0
            }
      },
      timePeriodContainer: {
            marginLeft: 18,
            backgroundColor: theme.background["00"],
            display: "flex",
            alignItems: "center",
            height: 35
      },
      compareTitle: {
            color: theme.text[20]
      },
      compareTitleDisabled: {
            color: theme.text[50]
      },
      checkbox: {
            ...theme.checkbox,
            marginRight: 14
      },
      checkBoxTrack: {
            backgroundColor: theme.background[30]
      },
      dividerNoMargin: {
            ...theme.divider,
            margin: "0px 12px 0px"
      },
      sections: {
            padding: "5px 0 5px"
      },
      btnContainer: {
            textAlign: "center",
            padding: 10,
      },
      btnSubmit: {
            ...theme.btn.primary,
            width: "45%",
            margin: 5
      },
      btnReset: {
            ...theme.btn.primaryNoHover,
            width: "45%",
            margin: 5,
            color: theme.palette.primary.main
      }
}));