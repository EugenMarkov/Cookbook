import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  modalBox: {
    position: "fixed",
    top: "10%",
    left: "calc(50% - 162px)",
    minHeight: "20%",
    width: 288,
    padding: theme.spacing(2),
    backgroundColor: "white",
    borderRadius: 4,
  },
  title: {
    fontWeight: 600,
    paddingBottom: theme.spacing(3),
  },
  closeBtn: {
    position: "absolute",
    top: "2%",
    right: "4%",
  },
  btn :{
    display: "flex",
    justifyContent: "center",
    margin: "20px auto 26px"
  }
}));

export default useStyles;
