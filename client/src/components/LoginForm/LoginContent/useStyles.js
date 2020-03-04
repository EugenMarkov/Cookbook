import makeStyles from "@material-ui/core/styles/makeStyles";
import theme from "../../../theme";

const useStyles = makeStyles({
  textField: {
    width: "90%",
    minWidth: 240,
    marginBottom: "20px",
  },
  title: {
    margin: "10px 0 30px 0",
    textTransform: "uppercase",
    textAlign: "center",
    color: theme.palette.primary.dark,
  },
  wrapper: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "70%",
    margin: "0 auto",
  },
  text: {
    marginTop: "0",
    fontSize: "18px",
  },
  regLink: {
    fontSize: "18px",
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  btn: {
    letterSpacing: "2px",
    margin: "10px 0",
    padding: "12px 100px",
    color: "white",
    width: "50%",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    width: "40vw",
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.down("lg")]: {
      width: "50vw",
    },
    [theme.breakpoints.down("md")]: {
      width: "70vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
  },
  errMsg: {
    fontSize: "24px",
    color: "red",
  },
  icon: {
    margin: "0 auto",
    color: theme.palette.primary.light,
    fontSize: "6.5em",
  },
});

export default useStyles;
