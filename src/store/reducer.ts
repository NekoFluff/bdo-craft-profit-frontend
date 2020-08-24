import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import { reducer as burgerMenu } from "redux-burger-menu";

export default combineReducers({
  entities: entitiesReducer,
  burgerMenu,
});
