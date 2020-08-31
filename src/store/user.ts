import { RootState } from "./reducer";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { LOGIN_ENDPOINT } from "../helpers/CONSTANTS";
import { createSelector } from "reselect";
import update from "react-addons-update";

type userSliceState = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  type?: string;
  // googleId?: string;
  accessToken?: string;
};

const initialState: userSliceState = {
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  type: null,
  // googleId: null,
  accessToken: null,
};

const slice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    userLoggedIn: (
      currentUser,
      action: {
        payload: {
          data: {
            name: string;
            email: string;
            type?: string;
          };
          headers?: any;
        };
      }
    ) => {
      console.log("User logged in. Payload:", action.payload);
      const { name, email, type } = action.payload.data;
      const accessToken = action.payload.headers["x-auth-token"];

      return update(currentUser, {
        name: { $set: name },
        email: { $set: email },
        accessToken: { $set: accessToken },
        type: { $set: type },
      });
    },
    userLoggedOut: (currentUser, _action) => {
      return update(currentUser, { $set: initialState });
    },
  },
});

export const { userLoggedIn, userLoggedOut } = slice.actions;

export default slice.reducer;

// Commands
export const loginUser = (user, headers?: any) =>
  apiCallBegan({
    url: LOGIN_ENDPOINT,
    method: "post",
    data: user,
    onSuccess: userLoggedIn.type,
    headers,
  });

export const logoutUser = () => slice.actions.userLoggedOut({});

// Selectors
export const getCurrentUser = () =>
  createSelector(
    (state: RootState) => state.entities.currentUser,
    (user) => user
  );
