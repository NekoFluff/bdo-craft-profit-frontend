import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import currentUserReducer from "./user";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  currentUser: currentUserReducer,
});
