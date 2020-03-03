import React, { useState } from "react";
import {connect} from "react-redux";
import jwt from "jwt-decode";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PreloaderAdaptiveSmall from "../../Preloader/AdaptiveSmall";
import { recipesEditItem } from "../../../store/actions/recipes";

import useStyles from "./useStyles";


const RecipeEditModal = ({ recipeItem, recipes, isOpen, isLoading, error, closeModalHandler, recipesEditItem }) => {
  const classes = useStyles();

  const [recipeInfo, setRecipeInfo] = useState(
    {
      name: recipeItem.name,
      description: recipeItem.description.join(".   "),
      customerId: jwt(localStorage.getItem("authToken")).id,
    });

  const handleRecipeInfo = event => {
    setRecipeInfo({ ...recipeInfo, [event.target.name]: event.target.value });
  };
  const id = recipes.filter(item => item.date === recipeItem.date)[0]._id;
  console.log(recipeItem);
  console.log(recipeInfo);
  console.log(id);
  const submitHandler = () => {
    recipesEditItem(id, recipeInfo);
  };

  const modal = () => {
    return (
      <Modal
        open={isOpen}
        onClose={closeModalHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <Box className={classes.modalBox}>
            <Typography
              component="h3"
              align="center"
              className={classes.title}
            >
             Edit recipe
            </Typography>
            <IconButton
              component="span"
              onClick={closeModalHandler}
              className={classes.closeBtn}
            >
              <CloseIcon />
            </IconButton>
            <ValidatorForm
              noValidate={false}
              className={classes.inputBox}
              onSubmit={submitHandler}
            >
              <TextValidator
                label="Recipe name"
                variant="standard"
                disabled
                name="name"
                inputProps={{
                  maxLength: 25,
                }}
                value={recipeInfo.name}
                onChange={(e) => handleRecipeInfo(e)}
                className={classes.input}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
              <TextValidator
                id="description"
                label="Description"
                name="description"
                variant="outlined"
                multiline
                rows="5"
                value={recipeInfo.description}
                inputProps={{
                  maxLength: 250,
                }}
                onChange={(e) => handleRecipeInfo(e)}
                className={classes.input}
                validators={["required"]}
                errorMessages={["This field is required"]}
              />
              {isLoading ? (
                <PreloaderAdaptiveSmall />
              ) : (
                <Button variant="contained" type="submit" className={classes.btn}>
                  Edit
                </Button>
              )}
              {error && (
                <Typography component="h3" align="center" className={classes.message}>
                  {error.message}
                </Typography>
              )}
            </ValidatorForm>
          </Box>
        </Fade>
      </Modal>
    );
  };

  return modal();

};

function mapStateToProps(state) {
  return {
    isLoading: state.recipesReducer.isLoading,
    recipes: state.recipesReducer.recipes,
    error: state.recipesReducer.error,
  };
}

export default connect(mapStateToProps, { recipesEditItem })(RecipeEditModal);
