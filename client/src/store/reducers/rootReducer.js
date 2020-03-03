import { combineReducers } from "redux";


import loginReducer from "./loginReducer";
import recipesReducer from "./recipesReducer";

const rootReducer = combineReducers({
  loginReducer,
  recipesReducer,
});

export default rootReducer;
