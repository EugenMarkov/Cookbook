import React from "react";
import { connect } from "react-redux";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import RecipesList from "../RecipesList";
import useStyles from "./useStyles";


const OnlyForAuthorzedUsers = ({ isAuthenticated }) => {
  const classes = useStyles();

  return isAuthenticated ? (
    <RecipesList /> ) : (
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.title}>Only for authorized users</Typography>
        <Typography align="center">Log in, please.</Typography>
      </Container>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,
  };
};

export default connect(mapStateToProps)(OnlyForAuthorzedUsers);
