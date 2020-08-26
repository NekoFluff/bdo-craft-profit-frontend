import React, { useState } from "react";
import WithTooltip from "./hoc/WithTooltip";
import { InputGroup, Form, Button, Accordion, Card } from "react-bootstrap";
import { ProfitCalculator } from "bdo-shopping-cart-package";
import numberWithCommas from "../helpers/numberWithCommas";
import secondsToHms from "../helpers/secondsToHms";

const RecipesSidebarTotalProfitAccordion = (props) => {
  const [marketPriceOverride, setMarketPriceOverride] = useState(-1);

  const handleMarketPriceFormSubmit = (e) => {
    e.preventDefault();
    const { onMarketPriceChange: callback } = props;

    if (callback != null) {
      callback(Math.round(marketPriceOverride));
    }
  };

  const handleMarketPriceChange = (e) => {
    setMarketPriceOverride(e.target.value);
    // console.log("MARKET PRICE CHANGE", e.target.value);
  };

  const renderOutput = () => {
    const { recipeTables } = props;
    // let craftCount = 0
    let cumulativeTimeSpent = 0;
    let expectedCount = 0;
    let individualPrice = 0;
    let profitPerItem = 0;
    let totalProfit = 0;
    let pps = 0;
    let totalTime = 0;
    let marketPrice = 0;
    let marketPriceLastUpdated = 0;
    if (recipeTables.length !== 0) {
      const item = recipeTables[0];
      marketPrice = item.getMarketPrice();

      if (item.marketData != null)
        marketPriceLastUpdated = item.marketData["Last Updated"];
      let correctShoppingCartData = item.getShoppingCartData(`/${item.name}`);

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
    }

    return (
      <Form onSubmit={handleMarketPriceFormSubmit}>
        {/* Total Profit */}
        <Form.Group>
          <WithTooltip tooltip="Profit = Silver spent - Silver earned from market">
            <Form.Label className="text">
              Total Profit: {numberWithCommas(Math.round(totalProfit))} silver
            </Form.Label>
          </WithTooltip>
          <br></br>

          {/* Total Profit */}
          <WithTooltip tooltip="Total amount of time spent crafting everything">
            <Form.Label className="text">
              Total Crafting Time: {secondsToHms(totalTime)}
            </Form.Label>
          </WithTooltip>

          {/* PPS */}
          <br></br>
          <WithTooltip tooltip="Total profit / Time spent crafting">
            <Form.Label className="text font-weight-bold">
              Profit per second (PPS): {numberWithCommas(pps.toFixed(2))}{" "}
              silver/sec
            </Form.Label>
          </WithTooltip>
        </Form.Group>

        <Form.Group>
          {/* Profit per Item */}
          <WithTooltip tooltip="Total profit / # of items sold">
            <Form.Text className="text-muted">
              Profit per item: {numberWithCommas(profitPerItem.toFixed(2))}
              silver
            </Form.Text>
          </WithTooltip>

          <br></br>

          {/* Market Price */}
          <WithTooltip
            tooltip={`How much it can be sold for... Last Updated: ${marketPriceLastUpdated}`}
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  Market Price
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder={marketPrice.toString()}
                aria-describedby="inputGroupPrepend"
                name="marketPrice"
                value={
                  marketPriceOverride === -1 ? marketPrice : marketPriceOverride
                }
                onChange={handleMarketPriceChange}
                // isInvalid={!!errors.username}
              />
            </InputGroup>
          </WithTooltip>
          <Form.Text className="text-muted">
            Press 'Enter' after changing the market price to re-calculate costs.
          </Form.Text>
        </Form.Group>
      </Form>
    );
  };

  return (
    <Accordion defaultActiveKey="0">
      {/* Card 3 */}
      <Card>
        <Card.Header style={{ backgroundColor: "rgb(230, 230, 230" }}>
          <Accordion.Toggle as={Button} variant="link" eventKey="2">
            Total Profit (Output)
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{renderOutput()}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default RecipesSidebarTotalProfitAccordion;
