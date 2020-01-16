import { fade, makeStyles } from '@material-ui/core/styles';

export const Styles = makeStyles(theme => ({
      root: {
            display: "flex",
            flexGrow: 1,
      },
      appBar: {
            zIndex: theme.zIndex.drawer + 1,
            boxShadow: theme.shadow["00"],
            backgroundColor: theme.background["00"]
      },
      menuButton: {
            marginRight: theme.spacing(0.5),
      },
      title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                  display: 'block',
            },
            fontSize: 17
      },
      logoContainer: {
            flexGrow: 1,
      },
      logo: {
            height: 25,
            [theme.breakpoints.up('sm')]: {
                  display: 'block',
            },

            "& svg": {
                  color: theme.text[50],
            }
      },
      search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.primary.main, 0.1),
            '&:hover': {
                  backgroundColor: fade(theme.palette.primary.main, 0.20),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                  marginLeft: theme.spacing(1),
                  width: 'auto',
            },
      },
      searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.text[50],
            "& svg": {
                  fontSize: 18
            },
      },
      inputRoot: {
            color: theme.text["00"],
      },
      inputInput: {
            fontSize: 13,
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                  width: 120,
                  '&:focus': {
                        width: 200,
                  },
            },
      },
      themeTogglerFab: {
            width: 25,
            height: 25,
            minHeight: 25,
            opacity: 0.1,
      },
      themeTogglerDay: {
            ...theme.btn.primary,
            padding: 2,
            color: theme.background["00"],
            backgroundColor: theme.reverse.background["00"],
            borderRadius: 15,
            fontSize: 16,
            transform: "rotate(120deg)"
      },
      themeTogglerNight: {
            ...theme.btn.primary,
            padding: 2,
            color: theme.reverse.background["00"],
            backgroundColor: theme.palette.primary.main,
            borderRadius: 15,
            fontSize: 16,
            transform: "rotate(120deg)"
      }
}));