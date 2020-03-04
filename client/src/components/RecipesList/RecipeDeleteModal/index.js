import React from "react";
import {connect} from "react-redux";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PreloaderAdaptiveSmall from "../../Preloader/AdaptiveSmall";
import { recipesDeleteItem } from "../../../store/actions/recipes";

import useStyles from "./useStyles";


const RecipeDeleteModal = ({ recipeItem, isOpen, isLoading, error, message, closeModalHandler, recipesDeleteItem }) => {
  const classes = useStyles();

  const submitHandler = () => {
    recipesDeleteItem(recipeItem._id);
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
             Delete recipe
            </Typography>
            <IconButton
              component="span"
              onClick={closeModalHandler}
              className={classes.closeBtn}
            >
              <CloseIcon />
            </IconButton>
            { !message && (
            <Typography component="h3" align="center" className={classes.message}>
              {`Are you sure to delete ${recipeItem.name} from recipes list?`}
            </Typography>
            )}
            {isLoading ? (
              <PreloaderAdaptiveSmall />
              ) : (
                <Button variant="contained" onClick={() => submitHandler()} className={classes.btn} disabled={Boolean(message)}>
                  Delete
                </Button>
              )}
            {error && (
            <Typography component="h3" align="center" className={classes.message}>
              {error.message}
            </Typography>
              )}
            {message && (
              <Typography component="h3" align="center" className={classes.message}>
                {message}
              </Typography>
            )}
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
    error: state.recipesReducer.error,
    message: state.recipesReducer.message,
  };
}

export default connect(mapStateToProps, { recipesDeleteItem })(RecipeDeleteModal);
