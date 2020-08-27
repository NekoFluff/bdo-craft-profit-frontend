import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import itemsReducer from "./items";
import currentUserReducer from "./user";
import calculatorReducer from "./calculator";

export default combineReducers({
  bugs: bugsReducer,
  items: itemsReducer,
  currentUser: currentUserReducer,
  calculator: calculatorReducer,
});
