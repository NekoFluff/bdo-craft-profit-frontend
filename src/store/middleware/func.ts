// Thunk / Func
import { Middleware } from "redux";

const func: Middleware = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") action(dispatch, getState);
  else next(action);
};

export default func;
