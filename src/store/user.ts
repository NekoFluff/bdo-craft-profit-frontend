import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { LOGIN_ENDPOINT } from "../helpers/CONSTANTS";
import { createSelector } from "reselect";

type userSliceState = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  // googleId?: string;
  accessToken?: string;
};

const initialState: userSliceState = {
  name: "",
  firstName: "",
  lastName: "",
  email: "",
  // googleId: null,
  accessToken: null,
};

const slice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    // action => action handler
    userLoggedIn: (
      currentUser,
      action: {
        payload: {
          data: {
            name: string;
            // givenName: string;
            // familyName: string;
            email: string;
            googleId?: string;
          };
          headers?: any;
        };
      }
    ) => {
      console.log("User logged in. Payload:", action.payload);
      const { name, email } = action.payload.data;
      const accessToken = action.payload.headers["x-auth-token"];
      currentUser.name = name;
      // currentUser.firstName = action.payload.givenName;
      // currentUser.lastName = action.payload.familyName;
      currentUser.email = email;
      // currentUser.googleId = googleId;
      currentUser.accessToken = accessToken;
    },
    userLoggedOut: (currentUser, _action) => {
      currentUser.name = "";
      currentUser.firstName = "";
      currentUser.lastName = "";
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
    (state: any) => state.entities.currentUser,
    (user) => user
  );
