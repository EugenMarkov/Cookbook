import axios from "axios";
import * as constants from "../constants";

export const getRecipesSuccess = data => {
  return {
    type: constants.RECIPES_GET_SUCCESS,
    payload: data,
  };
};
export const getRecipesFailure = err => {
  return {
    type: constants.RECIPES_GET_FAILURE,
    payload: err,
  };
};

export const getRecipes = () => dispatch => {
  dispatch({ type: constants.RECIPES_REQUEST });
  axios
    .get("/api/recipes")
    .then(res => {
      dispatch(getRecipesSuccess(res.data));
    })
    .catch(err => {
      dispatch(getRecipesFailure(err));
    });
};

export const deleteRecipesItemSuccess = data => {
  return {
    type: constants.RECIPES_DELETE_ITEM_SUCCESS,
    payload: data,
  };
};
export const deleteRecipesItemtFailure = err => {
  return {
    type: constants.RECIPES_DELETE_ITEM_FAILURE,
    payload: err,
  };
};

export const recipesDeleteItem = id => dispatch => {
  dispatch({ type: constants.RECIPES_REQUEST });
  axios
    .delete(`/api/recipes/${id}`)
    .then(res => {
      dispatch(deleteRecipesItemSuccess(res.data));
    })
    .catch(err => {
      dispatch(deleteRecipesItemtFailure(err));
    });
};

export const addRecipesItemSuccess = data => {
  return {
    type: constants.RECIPES_ADD_ITEM_SUCCESS,
    payload: data,
  };
};
export const addRecipesItemtFailure = err => {
  return {
    type: constants.RECIPES_ADD_ITEM_FAILURE,
    payload: err,
  };
};

export const recipesAddItem = (recipe) => dispatch => {
  dispatch({ type: constants.RECIPES_REQUEST });
  axios
    .post(`/api/recipes`, recipe)
    .then(res => {
      dispatch(addRecipesItemSuccess(res.data));
    })
    .catch(err => {
      dispatch(addRecipesItemtFailure(err));
    });
};

export const editRecipesItemSuccess = data => {
  return {
    type: constants.RECIPES_EDIT_ITEM_SUCCESS,
    payload: data,
  };
};
export const editRecipesItemtFailure = err => {
  return {
    type: constants.RECIPES_EDIT_ITEM_FAILURE,
    payload: err,
  };
};

export const recipesEditItem = (id, updatedRecipe) => dispatch => {
  dispatch({ type: constants.RECIPES_REQUEST });
  axios
    .put(`/api/recipes/${id}`, updatedRecipe)
    .then(res => {
      dispatch(editRecipesItemSuccess(res.data));
    })
    .catch(err => {
      dispatch(editRecipesItemtFailure(err));
    });
};

export const recipesLogOut = () => {
  return {
    type: constants.RECIPES_LOG_OUT,
  };
};
