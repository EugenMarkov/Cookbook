import { createMuiTheme } from '@material-ui/core/styles';
import { purple, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({

  breakpoints: {
    keys: [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: purple[700],
      light: purple[100],
      dark: purple[800],
    },
    secondary: {
      main: grey[700],
      dark: grey[800],
      medium: grey[500],
      light: grey[200],
    },
  },
  spacing: 8,

  typography: {
    h3: {
      fontSize: 22,
      fontWeight: 700,
      textTransform: "uppercase",
      color: grey[800]
    },
    h4: {
      fontSize: 20,
      fontWeight: 600,
      margin: 30,
      marginBottom: 8,
      textTransform: "uppercase",
      textAlign: "center",
      color: grey[800]
    }
  },

  overrides: {
    MuiGridListTile: {
      root: {
        position: "relative",
        height:"auto"
      },
      tile: {
        padding: "0.5em 0.5em",
        height:"auto",
      },
    },

    MuiTooltip: {
      tooltip: {
        fontSize: "13px",
        backgroundColor: purple[700],
      },
      arrow: {
        color: purple[700],
      },
    },
    MuiIconButton: {
      root: {
        color: purple[700],
        "&:hover": {
          backgroundColor: purple[100],
        },
      },
    },

    MuiFab: {
      secondary: {
        backgroundColor: purple[700],
        "&:hover": {
          backgroundColor: purple[800],
        },
      },
    },

    MuiButton: {
      root: {
        fontSize: 13,
        fontWeight: 600,
      },
      text: {
        color: grey[700],
        "&:hover": {
          color: purple[800],
          backgroundColor: purple[100],
        },
      },
      contained: {
        color: "white",
        backgroundColor: purple[700],
        "&:hover": {
          backgroundColor: purple[800],
        },
      },
      outlined: {
        color: purple[700],
        "&:hover": {
          color: purple[800],
          backgroundColor: purple[100]
        },
      },
    },
    MuiInputLabel: {
      outlined: {
        fontWeight: 800,
        backgroundColor: "white",
      },
    },
  },
});

export default theme;
