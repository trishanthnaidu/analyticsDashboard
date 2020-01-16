export const Styles = theme => ({
      root: {
            display: 'flex',
            backgroundColor: theme.background[20],
      },
      container: {
            padding: "8px 0",
            width: 300,
            backgroundColor: theme.background["00"],
      },
      toggleButtonGroupContainer: {
            backgroundColor: theme.background[30],
            margin: "0 8px 8px",

      },
      toggleButtonGroup_Root: {
            backgroundColor: theme.background[20],
            width: "100%",
            display: "inline-flex",
            borderRadius: 4,
            padding: 1,
      },
      toggleButtonGroup_Grouped: {
            margin: theme.spacing(0.5),
            border: 'none',
            '&:not(:first-child)': {
                  borderRadius: theme.shape.borderRadius,
            },
            '&:first-child': {
                  borderRadius: theme.shape.borderRadius,
            },
      },
      toggleButton: {
            padding: "0 20px",
            height: 27,
            backgroundColor: theme.background[20],
            border: "none",
            color: theme.text[50],
            textTransform: "capitalize",
            width: "50%",
            "&.Mui-selected": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.background["00"],
            }
      },
      toggleButtonDivider: {
            alignSelf: 'stretch',
            height: 'auto',
            margin: theme.spacing(1, 0.5),
            padding: 0,
            backgroundColor: theme.background["30"]
      },
      preSelectsContainerWrapper: {
            width: 900,
      },
      preSelectsContainer: {
            backgroundColor: theme.background["00"],
            padding: "0 10px",
            transition: "transform 0.7s ease-out",
            width: 300,
            display: "inline-block"
      },
      btnYear: {
            margin: "5px 0",
            padding: 3,
            textTransform: "capitalize",
            fontSize: 13,
            fontFamily: "cadiz-bold"
      },
      quickSelect: {
            color: theme.text[50],
            fontSize: theme.typography.body1.fontSize,
            marginTop: 6,
            float: "right",
      },
      popover_Paper: {
            backgroundColor: theme.background[20],
            color: theme.text[30],
      },
      popover_daysOfWeekPaper: {
            backgroundColor: theme.background[20],
            color: theme.text[30],
            width: 100,
            minWidth: "100px !important",

            "& ul>li:first-child": {
                  padding: "2px 12px 5px"
            }
      },
      monthContainerWrapper: {
            width: 900,
            height: 200,
            backgroundColor: theme.background[10],
            display: "flex"
      },
      monthsContainer: {
            padding: 10,
            width: 300,
            display: "inline-block",
            transition: "transform 0.5s ease-out",

            "& button": {
                  border: "none",
                  margin: "5px 15px",
                  fontFamily: "cadiz-bold",
                  color: theme.text[50],
                  height: 35,
                  width: 60,
                  borderRadius: 20,

                  "&.Mui-selected": {
                        margin: "5px 15px !important",
                        color: theme.text[90],
                        backgroundColor: theme.palette.primary.main,
                  }
            }
      },
      weeksContainer: {
            padding: "8px 8px",
            width: 300,
            display: "inline-block",
            transition: "transform 0.5s ease-out",

            "& button": {
                  border: "none",
                  color: theme.text[30],
                  fontFamily: "cadiz-bold",
                  height: 24,
                  backgroundColor: theme.background[20],
                  width: 30,
                  margin: "2px 4px",
                  fontSize: 13,

                  "&.Mui-selected": {
                        color: theme.text[90],
                        backgroundColor: theme.palette.primary.main,
                  }
            }
      },
      daysContainer: {
            padding: "8px 10px",
            width: 300,
            display: "inline-block",
            transition: "transform 0.5s ease-out",

            "& button": {
                  border: "none",
                  color: theme.text[30],
                  fontFamily: "cadiz-bold",
                  height: 27,
                  backgroundColor: theme.background[20],
                  width: 40,
                  margin: 2,

                  "&.Mui-selected": {
                        color: theme.text[20],
                        backgroundColor: theme.background["none"],
                  }
            }
      },
      monthRowContainer: {
            textAlign: "center"
      },
      daysOfWeekContainer: {
            backgroundColor: theme.background["00"],
            padding: "0 10px"
      },
      daysOfWeek: {
            color: theme.text[50],
            fontSize: theme.typography.body1.fontSize,
            marginTop: 7,
            float: "right"
      },
      btnActionContainer: {
            padding: "6px 10px 0",
            textAlign: "right"
      },
      selectedDateContainer: {
            padding: "8px 15px",
            width: 300,
            height: 380,
            overflowY: "auto",
            backgroundColor: theme.background[10],
            zIndex: 1,
            borderLeft: `solid 1px ${theme.background[20]}`
      },
      titleSelectedMonth: {
            margin: "15px 12px 8px",
            color: theme.text[60],
            fontWeight: "bold"
      },
      titleSelectedMonthForWeeks: {
            margin: "10px 10px 5px",
            color: theme.text[50]
      },
      selectedMonthsChip: {
            color: theme.palette.primary.main,
            backgroundColor: theme.background["00"],
            margin: 2,
            padding: 1,

      },
      divider: theme.divider,
      weeksRowContainerHeader: {
            margin: "5px 0px 10px",
            "& span:first-child": {
                  marginRight: 11,
            },
            "& span": {
                  fontSize: 13,
                  margin: "1px 13px",
                  padding: 0,
                  color: theme.text[60],
                  minWidth: 27,
                  borderRadius: 10
            }
      },
      weeksRowContainer: {},
      weekRowNumber: {
            "&:hover": {
                  color: theme.palette.primary.main,
            }
      },
      weekRowSelected: {
            backgroundColor: `${theme.palette.primary.main}30`,
            borderRadius: 20,
            padding: "5px 0"
      },
      dateCurrentMonth: {
            fontSize: 13,
            margin: "3px 5px",
            padding: 0,
            color: theme.text[30],
            minWidth: 25,
            borderRadius: 10,
            "&:hover": {
                  color: theme.palette.primary.main,
            }
      },
      dateNotCurrentMonth: {
            fontSize: 13,
            margin: "3px 5px",
            padding: 0,
            color: theme.text[60],
            minWidth: 25,
            borderRadius: 10
      },
      daysRowContainerHeader: {
            margin: "5px 0px 10px",
            textAlign: "center",
            "& span": {
                  fontSize: 13,
                  margin: "1px 13px",
                  padding: 0,
                  color: theme.text[60],
                  minWidth: 27,
                  borderRadius: 10
            }
      },
      daysRowContainer: {
            textAlign: "center",
      },
      daysSelected: {
            backgroundColor: `${theme.palette.primary.main}30`,
            color: theme.text[20],
      },
      daysOfWeekMenu: {
            padding: "0 5px"
      },
      daysOfWeekCheckbox: {

      }
});