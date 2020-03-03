import * as constants from "../constants";

const initialState = {
  isLoading: false,
  recipes: [],
  error: "",
  message: "",
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.RECIPES_REQUEST:
      return { ...state, isLoading: true };
    case constants.RECIPES_GET_SUCCESS:
      return { ...state, isLoading: false, recipes: action.payload, error: "", message: "" };
    case constants.RECIPES_GET_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case constants.RECIPES_ADD_ITEM_SUCCESS:
      return { ...state, isLoading: false, recipes: action.payload, error: "", message: "" };
    case constants.RECIPES_ADD_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case constants.RECIPES_EDIT_ITEM_SUCCESS:
      return { ...state, isLoading: false, recipes: action.payload, error: "", message: "" };
    case constants.RECIPES_EDIT_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case constants.RECIPES_DELETE_ITEM_SUCCESS:
      return { ...state, isLoading: false, recipes: action.payload.recipes, error: "", message: action.payload.message };
    case constants.RECIPES_DELETE_ITEM_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case constants.RECIPES_LOG_OUT:
      return { ...state, isLoading: false, recipes: [], error: "", message: "" };
    default:
      return state;
  }
};

export default recipesReducer;
