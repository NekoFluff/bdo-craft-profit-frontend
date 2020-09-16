import { createSlice } from "@reduxjs/toolkit";
import { Buffs } from "bdo-shopping-cart-package";
import update from "react-addons-update";
import { createSelector } from "reselect";

import { LOGIN_ENDPOINT, SIGN_UP_ENDPOINT } from "../helpers/CONSTANTS";
import { BUFFS_ENDPOINT } from "./../helpers/CONSTANTS";
import { apiCallBegan } from "./api";
import { RootState } from "./reducer";

// export type Buffs = { [key: string]: { timeReduction: number } };

type userSliceState = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  type?: string;
  // googleId?: string;
  accessToken?: string;
  error?: string;
  buffs?: Buffs;
};

const initialState: userSliceState = {
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  type: null,
  // googleId: null,
  accessToken: null,
  buffs: null,
  error: null,
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
            buffs?: Buffs;
          };
          headers?: any;
        };
      }
    ) => {
      console.log("User logged in. Payload:", action.payload);
      const { name, email, type, buffs } = action.payload.data;
      const accessToken = action.payload.headers["x-auth-token"];

      return update(currentUser, {
        name: { $set: name },
        email: { $set: email },
        accessToken: { $set: accessToken },
        type: { $set: type },
        buffs: { $set: buffs },
        error: { $set: null },
      });
    },
    userFailedLogIn: (currentUser, action) => {
      return update(currentUser, { error: { $set: action.payload } });
    },
    userLoggedOut: (currentUser, _action) => {
      return update(currentUser, { $set: initialState });
    },
    updatedBuffs: (currentUser, action) => {
      return update(currentUser, {
        buffs: { $set: action.payload.data.buffs },
      });
    },
    failedUpdateBuffs: (currentUser, action) => {
      return update(currentUser, { error: { $set: action.payload } });
    },
    resetError: (currentUser, _action) => {
      return update(currentUser, { error: { $set: null } });
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  userFailedLogIn,
  updatedBuffs,
  failedUpdateBuffs,
  resetError,
} = slice.actions;

export default slice.reducer;

type LoginUser = {
  email: string;
  password: string;
};

type SignUpUser = {
  name: string;
  email: string;
  password: string;
};

// Commands
export const loginUser = (user?: LoginUser, headers?: any) =>
  apiCallBegan({
    url: LOGIN_ENDPOINT,
    method: "post",
    data: user,
    onSuccess: userLoggedIn.type,
    onError: userFailedLogIn.type,
    headers,
  });

export const logoutUser = () => slice.actions.userLoggedOut({});

export const signUpUser = (user?: SignUpUser, headers?: any) =>
  apiCallBegan({
    url: SIGN_UP_ENDPOINT,
    method: "post",
    data: user,
    onSuccess: userLoggedIn.type,
    onError: userFailedLogIn.type,
    headers,
  });

export const updateBuffs = (buffs: Buffs, headers: any) =>
  apiCallBegan({
    url: BUFFS_ENDPOINT,
    method: "post",
    data: buffs,
    onSuccess: updatedBuffs.type,
    onError: failedUpdateBuffs.type,
    headers,
  });

// Selectors
export const getCurrentUser = () =>
  createSelector(
    (state: RootState) => state.entities.currentUser,
    (user) => user
  );

export const getAuthToken = () =>
  createSelector(
    (state: RootState) => state.entities.currentUser,
    (user) => user.accessToken
  );

export const getBuffs = () =>
  createSelector(
    (state: RootState) => state.entities.currentUser,
    (user) => (user.buffs ? user.buffs : null)
  );

export const getBuff = (action: string) =>
  createSelector(
    (state: RootState) => state.entities.currentUser,
    (user) => (user.buffs ? user.buffs[action] : null)
  );
