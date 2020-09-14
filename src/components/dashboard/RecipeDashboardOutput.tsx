import {
  getMarketPriceForItem,
  getShoppingCartDataForItem,
  ProfitCalculator,
} from "bdo-shopping-cart-package";
import React from "react";
import { useSelector } from "react-redux";

import numberWithCommas from "../../helpers/numberWithCommas";
import secondsToHms from "../../helpers/secondsToHms";
import { RootState } from "../../store/reducer";

import "../../scss/DashboardOutput.scss";

const RecipeDashboardOutput = (props) => {
  const item = useSelector(
    (state: RootState) =>
      state.entities.items.data[state.entities.items.rootItem]
  );

  let cumulativeTimeSpent = 0;
  let expectedCount = 0;
  let individualPrice = 0;
  let profitPerItem = 0;
  let totalProfit = 0;
  let pps = 0;
  let totalTime = 0;
  let marketPrice = 0;
  if (item == null) return null;

  marketPrice = getMarketPriceForItem(item);

  let correctShoppingCartData = getShoppingCartDataForItem(
    item,
    `/${item.name}`
  );

  if (correctShoppingCartData != null) {
    // craftCount = correctShoppingCartData.craftCount;
    cumulativeTimeSpent = correctShoppingCartData.cumulativeTimeSpent;
    expectedCount = correctShoppingCartData.expectedCount;
    totalTime = cumulativeTimeSpent * expectedCount;
    individualPrice = correctShoppingCartData.individualPrice;
    profitPerItem = ProfitCalculator.calculateProfit(
      marketPrice,
      individualPrice
    );

    // console.log(
    //   "Total Profit | ",
    //   marketPrice,
    //   profitPerItem,
    //   expectedCount,
    //   individualPrice
    // );
    totalProfit = profitPerItem * expectedCount;
    pps = ProfitCalculator.calculateProfitPerSecond(
      marketPrice,
      individualPrice,
      cumulativeTimeSpent
    );
  }

  return (
    <React.Fragment>
      <div className="dashboard-output">
        <div className="dashboard-output__title">Results</div>

        <div className="dashboard-output__content">
          <div className="dashboard-output__left">
            <div className="dashboard-output__number">
              {numberWithCommas(Math.round(individualPrice * expectedCount))}
            </div>
            <div className="dashboard-output__text">Silver Spent</div>
          </div>

          <div className="dashboard-output__middle-2">
            <div className="dashboard-output__number">
              {secondsToHms(totalTime)}
            </div>
            <div className="dashboard-output__text">Crafting Time</div>
          </div>
          <div className="dashboard-output__middle">
            <div className="dashboard-output__number">
              {numberWithCommas(Math.round(totalProfit))}
            </div>
            <div className="dashboard-output__text">Total Profit</div>
          </div>
          <div className="dashboard-output__right">
            <div className="dashboard-output__number">
              {numberWithCommas(pps.toFixed(2))}
            </div>
            <div className="dashboard-output__text">Profit per Second</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecipeDashboardOutput;
