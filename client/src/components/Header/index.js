import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import RestaurantIcon from '@material-ui/icons/Restaurant';
import { Box } from "@material-ui/core";
import LoginButton from "../LoginButton/LoginButton";
import LoginForm from "../LoginForm";

import useStyles from "./useStyles";

const Header = ({ isAuthenticated, recipesCounter }) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar color="inherit" position="fixed">
        <Toolbar className={classes.flex}>
          <div className={classes.logo_wrapper}>
            <Link to="/">
              <img src="/img/caponata-pasta_1.jpg" alt="Recipes" className={classes.logo} />
            </Link>
          </div>
          <Typography variant="h3" className={classes.title}>
            BEST RECIPES OF THE WORLD
          </Typography>
          <div>
            <LoginButton />
            {isAuthenticated && (
              <IconButton aria-label="show favourites" color="inherit">
                <Badge badgeContent={recipesCounter} color="primary">
                  <RestaurantIcon />
                </Badge>
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <LoginForm />
      <Box className={classes.layer} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.loginReducer.isAuthenticated,
    recipesCounter: state.recipesReducer.recipes.length,
  };
}

export default connect(mapStateToProps)(Header);
