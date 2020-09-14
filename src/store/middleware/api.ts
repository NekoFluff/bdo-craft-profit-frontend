import axios from "axios";
import { Middleware } from "redux";

import { API_ENDPOINT } from "../../helpers/CONSTANTS";
import * as actions from "../api";
import { APIPayload } from "./../api";

const api: Middleware = ({ dispatch }) => (next) => async (action: {
  payload: APIPayload;
  type: string;
}) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError,
    headers,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: API_ENDPOINT,
      url,
      method,
      data,
      headers,
    });

    const result = { data: response.data, headers: response.headers };
    // General
    dispatch(actions.apiCallSuccess(result));
    // Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: result });
  } catch (error) {
    // General
    dispatch(actions.apiCallFailed(error.message));
    // Specific
    if (onError && error.response != null)
      dispatch({ type: onError, payload: error.response.data });
  }
};

export default api;
