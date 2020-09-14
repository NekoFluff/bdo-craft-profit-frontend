import { getMarketPriceForItem } from "bdo-shopping-cart-package";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../../store/reducer";
import WithTooltip from "../hoc/WithTooltip";

const MarketPriceInput = (props) => {
  // Selectors
  const item = useSelector(
    (state: RootState) =>
      state.entities.items.data[state.entities.items.rootItem]
  );

  // Variables
  let marketPrice = 0;
  if (item) marketPrice = getMarketPriceForItem(item);

  let marketPriceLastUpdated = 0;
  if (item && item.marketData)
    marketPriceLastUpdated = item.marketData["Last Updated"];

  return (
    <Form.Group>
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
              props.marketPriceOverride === -1
                ? marketPrice
                : props.marketPriceOverride
            }
            onChange={(e) => {
              props.updateMarketPrice(e.target.value);
            }}
            // isInvalid={!!errors.username}
          />
        </InputGroup>
      </WithTooltip>
      <Form.Text className="text-muted">
        Press 'Enter' after changing the market price to re-calculate costs.
      </Form.Text>
      {item &&
        item.marketData &&
        item.marketData["Market Price"] !== props.marketPriceOverride &&
        props.marketPriceOverride !== -1 && (
          <Button
            style={{ marginTop: "0.5em" }}
            onClick={(e) => {
              // e.preventDefault();
              const value = item ? item.marketData["Market Price"] : -1;
              props.updateMarketPrice(value);
              props.forceUpdate(value);
            }}
          >
            Reset market price
          </Button>
        )}
    </Form.Group>
  );
};

export default MarketPriceInput;
