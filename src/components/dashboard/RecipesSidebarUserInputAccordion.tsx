import { ProfitCalculator } from "bdo-shopping-cart-package";
import React from "react";
import { Accordion, Button, ButtonGroup, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

import numberWithCommas from "../../helpers/numberWithCommas";
import { RootState } from "../../store/reducer";
import WithTooltip from "../hoc/WithTooltip";

const RecipesSidebarUserInputAccordion = (props) => {
  const items = useSelector((state: RootState) => state.entities.items.data);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onUpdateValuePack = (e) => {
    const { onUpdateValuePack: callback } = props;

    if (callback != null) {
      callback(e.target.checked);
    }
  };

  const onUpdateCraftCount = (e) => {
    const { onUpdateCraftCount: callback } = props;

    if (callback != null) {
      callback(e.target.value);
    }
  };

  const renderShoppingCart = () => {
    // console.log("Render shopping cart (what you need to buy)");

    // Handle null case
    if (Object.values(items).length == null) {
      return (
        <p>
          Please select a recipe using the search bar. There is no shopping cart
          data to display.
        </p>
      );
    }

    // Handle non-null case
    var totalCost = 0;
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Button disabled style={{ textAlign: "center" }}>
            Download shopping list (Feature in-progress)
          </Button>
        </Form.Group>
        <Form.Group>
          <WithTooltip tooltip="What the optimizer suggests you buy to craft the items.">
            <Form.Label className={"text font-italic"}>
              Shopping List:
            </Form.Label>
          </WithTooltip>
        </Form.Group>
        <Form.Group>
          {Object.values(items).map((item) => {
            // if (item.activeRecipeId != null) return null; // Only generate form labels for items being bought
            if (item.shoppingCartData == null) return null; // If there is no shopping cart data for this, skip it

            return Object.keys(item.shoppingCartData).map((key) => {
              const {
                action,
                expectedCount,
                individualPrice,
              } = item.shoppingCartData[key];
              if (action !== "Buy") return null;
              totalCost += expectedCount * individualPrice;
              return (
                <React.Fragment key={key}>
                  <Form.Label
                    key={key}
                    className={"text"}
                    style={{ marginBottom: "0px" }}
                  >{`${item.name} x ${numberWithCommas(
                    expectedCount
                  )} = ${numberWithCommas(
                    expectedCount * individualPrice
                  )} silver`}</Form.Label>
                  <Form.Text
                    className="text-muted"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {`for ${key}`}
                  </Form.Text>
                </React.Fragment>
              );
            });
          })}
        </Form.Group>

        <Form.Group>
          <Form.Label className={"text font-weight-bold"}>
            {`Total: ${numberWithCommas(totalCost)} silver`}{" "}
          </Form.Label>
        </Form.Group>
      </Form>
    );
  };

  const renderInput = () => {
    return (
      <Form onSubmit={handleSubmit}>
        {/* Craft COunt */}
        <Form.Group controlId="formCraftCount">
          <Form.Label>How many would you like to craft?</Form.Label>
          <Form.Control
            onChange={onUpdateCraftCount}
            type="number"
            placeholder="100 (default)"
          />
          <Form.Text className="text-muted">
            Adjustments are instantly reflected in the dashboard.
          </Form.Text>
        </Form.Group>

        {/* Value Pack Checkbox */}
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Value Pack Enabled"
            onChange={onUpdateValuePack}
            checked={ProfitCalculator.valuePackEnabled}
          />
          <Form.Text className="text-muted">
            This checkbox re-runs the optimizer and reselects what items to
            craft and what items to buy from the market.
          </Form.Text>
        </Form.Group>

        {/* Optimizer */}
        <Form.Label>Choose an optimizer:</Form.Label>
        <Form.Group>
          <ButtonGroup aria-label="Basic example">
            <WithTooltip tooltip="Maximize the silver earned per second (a.k.a Profit Per Second)!">
              <Button variant="primary">PPS</Button>
            </WithTooltip>

            <WithTooltip tooltip="(Not implemented) Maximize the total amount of profit (at thecost of time)!">
              <Button disabled variant="secondary">
                Total Profit
              </Button>
            </WithTooltip>

            <WithTooltip tooltip="(Not implemented) Maximize the total amount of EXP generated!">
              <Button disabled variant="secondary">
                EXP
              </Button>
            </WithTooltip>
          </ButtonGroup>
        </Form.Group>
      </Form>
    );
  };

  return (
    <Accordion defaultActiveKey="0">
      {/* Card 1 */}
      <Card>
        <Card.Header style={{ backgroundColor: "rgb(200, 200, 200)" }}>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Input
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{renderInput()}</Card.Body>
        </Accordion.Collapse>
      </Card>
      {/* Card 2 */}
      <Card>
        <Card.Header style={{ backgroundColor: "rgb(200, 200, 200)" }}>
          <Accordion.Toggle as={Button} variant="link" eventKey="2">
            What you need to buy
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body>{renderShoppingCart()}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default RecipesSidebarUserInputAccordion;
