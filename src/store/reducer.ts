import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import { reducer as burgerMenu } from "redux-burger-menu";

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  burgerMenu,
});

export type RootState = ReturnType<typeof rootReducer>;
