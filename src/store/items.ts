import { createSlice } from "@reduxjs/toolkit";
import { Item } from "bdo-shopping-cart-package";
import update from "react-addons-update";
import { createSelector } from "reselect";

type itemsSliceState = {
  rootItem: string;
  data: { [key: string]: Item };
  order: string[];
  loading: boolean;
  lastFetch: number;
};

const initialState: itemsSliceState = {
  rootItem: "",
  data: {},
  order: [],
  loading: false,
  lastFetch: null,
};

const slice = createSlice({
  name: "items",
  initialState: initialState,
  reducers: {
    itemsRequested: (items, action) => {
      return update(items, {
        loading: { $set: true },
      });
    },

    itemsReceived: (items, action) => {
      return update(items, {
        data: { $set: action.payload },
        loading: { $set: false },
        lastFetch: { $set: Date.now() },
      });
    },

    itemsRequestFailed: (items, action) => {
      return update(items, {
        loading: { $set: false },
      });
    },

    // command - event
    itemsSet: (items, action) => {
      return update(items, {
        data: { $set: action.payload },
      });
    },

    itemsOrderSet: (items, action) => {
      return update(items, {
        order: { $set: action.payload },
      });
    },

    rootItemSet: (items, action) => {
      return update(items, {
        rootItem: { $set: action.payload },
      });
    },
  },
});

export const {
  itemsRequested,
  itemsReceived,
  itemsRequestFailed,
  itemsSet,
  itemsOrderSet,
  rootItemSet,
} = slice.actions;
export default slice.reducer;

// Selectors
export const getItemsByUser = (userId) =>
  createSelector(
    (state: any) => state.entities.items,
    (items) => items.filter((bug) => bug.userId === userId)
  );
