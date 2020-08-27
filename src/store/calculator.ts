import { createSlice } from "@reduxjs/toolkit";
import update from "react-addons-update";

type calculatorSliceState = {
  overrideMarketPrices: { [key: string]: number };
};

const initialState: calculatorSliceState = {
  overrideMarketPrices: {},
};

const slice = createSlice({
  name: "calculator",
  initialState: initialState,
  reducers: {
    // command - event
    marketPriceOverrided: (
      calculator,
      action: {
        payload: {
          itemName: string;
          marketPrice: number;
        };
      }
    ) => {
      // console.log("Override price", action);
      return update(calculator, {
        overrideMarketPrices: {
          [action.payload.itemName]: { $set: action.payload.marketPrice },
        },
      });
    },
  },
});

export const { marketPriceOverrided } = slice.actions;
export default slice.reducer;
