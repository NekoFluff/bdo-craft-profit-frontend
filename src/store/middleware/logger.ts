import { Middleware } from 'redux';

// SNA
const logger: Middleware = param => store => next => action => {
  console.log("Logging", param);
  return next(action);
  // logger > toast > api
};

export default logger;

// Currying
// N => 1
