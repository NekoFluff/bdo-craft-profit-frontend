import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from './api';
import { LOGIN_ENDPOINT } from '../helpers/CONSTANTS'
import { createSelector } from 'reselect';

const slice = createSlice({
  name: "currentUser",
  initialState: {
    name: ''
  },
  reducers: {
    // action => action handler
    userLoggedIn: (currentUser, action) => {
      currentUser.name = action.payload.name
    },
    userLoggedOut: (currentUser, _action) => {
      currentUser.name = ''
    }
  }
});

export const { userLoggedIn, userLoggedOut } = slice.actions;

export default slice.reducer;

// Commands
export const loginUser = user => 
  apiCallBegan({
    url: LOGIN_ENDPOINT,
    method: "post",
    data: user,
    onSuccess: userLoggedIn.type
  })

export const logoutUser = () => 
  slice.actions.userLoggedOut({})

// Selectors
export const getCurrentUser = () =>
  createSelector(
    (state: any) => state.entities.currentUser,
    user => user
  );