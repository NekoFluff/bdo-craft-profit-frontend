import { combineReducers } from "redux";

import bugsReducer from "./bugs";
import calculatorReducer from "./calculator";
import itemsReducer from "./items";
import currentUserReducer from "./user";

export default combineReducers({
  bugs: bugsReducer,
  items: itemsReducer,
  currentUser: currentUserReducer,
  calculator: calculatorReducer,
});
