import React, {useEffect} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import jwt from "jwt-decode";

import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import {AuthHOC} from '../components/common/hoc/AuthHOC';
import setAuthToken from "../components/common/setAuthToken";
import isExpired from "../components/common/isExpired/isExpired";
import Preloader from "../components/Preloader";

import { getUser, logOut, preloaderClose, userFromJwt, } from "../store/actions/loginActions";
import { getRecipes } from "../store/actions/recipes";


const Routes = ({
                  preloaderClose,
                  preloader,
                  userFromJwt,
                  logOut,
                  getRecipes,
                  getUser,
                }) => {

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const isExpiredToken = isExpired(jwt(token));
      if (isExpiredToken) {
        userFromJwt(jwt(token));
        preloaderClose();
        setAuthToken(token);
        getUser();
        getRecipes();
      } else {
        logOut();
        preloaderClose();
      }
    } else {
      preloaderClose();
    }
  }, [preloaderClose, userFromJwt, logOut, getRecipes, getUser]);

  return preloader ? (
    <Preloader />
  ) : (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/profile" component={AuthHOC(ProfilePage)} />
      <Route path="/registration" component={RegistrationPage} />
      <Redirect to="/" />
    </Switch>
  )
};

function mapStateToProps(state) {
  return {
    preloader: state.loginReducer.loginPreloader,
  };
}

export default connect(mapStateToProps, {
  preloaderClose,
  userFromJwt,
  logOut,
  getRecipes,
  getUser,
})(Routes);
