import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    height: "40px",
    display: "flex",
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
  },
  logo_wrapper : {
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
  },
  title: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  link: {
    color: "black",
    "&visited": {
      color: "theme. primary.dark",
    },
  },
  layer: {
    display: "flex",
    marginTop: 65,
    justifyContent: "center"
  },
}));
export default useStyles;
