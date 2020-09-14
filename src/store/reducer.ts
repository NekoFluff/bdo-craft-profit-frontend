import { combineReducers } from "redux";
import { reducer as burgerMenu } from "redux-burger-menu";

import entitiesReducer from "./entities";

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  burgerMenu,
});

export type RootState = ReturnType<typeof rootReducer>;
