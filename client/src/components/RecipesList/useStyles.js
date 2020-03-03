import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  description: {
    width: "300px",
    textAlign: "justify",
    fontSize: "0.875rem",
    marginBottom: 10,
    [theme.breakpoints.up("md")]: {
      width: "500px",
    },
  },
  message: {
    margin: "16px 0px 16px 0",
    textAlign: "center",
  },
  btn: {
    margin: theme.spacing(2),
  }
}));

export default useStyles;
