import { createSlice } from "@reduxjs/toolkit";

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
    marketPriceOverrided: (calculator, action) => {
      calculator.overrideMarketPrices[action.payload.itemName] =
        action.payload.marketPrice;
    },
  },
});

export const { marketPriceOverrided } = slice.actions;
export default slice.reducer;
