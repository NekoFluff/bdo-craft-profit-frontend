import React, { Component } from "react";
import {
  InputGroup,
  FormControl,
  Form,
  Button,
  Accordion,
  Card,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "../css/Dashboard.css";
import numberWithCommas from "../helpers/numberWithCommas";
import secondsToHms from "../helpers/secondsToHms";
import { ProfitCalculator } from 'bdo-shopping-cart-package';
import { Item } from 'bdo-shopping-cart-package'
import { withRouter, RouteComponentProps } from 'react-router';

type sidebarProps = {
  recipeTables: Item[],
  onUpdateCraftCount: (newCraftCount) => void,
  onUpdateValuePack: (valuePackEnabled) => void,
  onMarketPriceChange: (newMarketPrice) => void,
} & RouteComponentProps

type sidebarState = {
  overrideMarketPrice: number | null
}

class sidebar extends Component<sidebarProps, sidebarState> {
  state : sidebarState = {
    overrideMarketPrice: null,
  };

  componentDidMount() {
    ProfitCalculator.valuePackEnabled = true
  }

  componentWillReceiveProps(newProps) {
    const { recipeTables } = newProps;
    const { recipeTables: oldRecipeTables } = this.props;

    if (recipeTables != null) {
      const item = recipeTables[0];
      if (item == null) return
      if (
        this.state.overrideMarketPrice == null ||
        (oldRecipeTables != null &&
          oldRecipeTables[0].name !== recipeTables[0].name)
      ) {
        this.setState({ overrideMarketPrice: item.getMarketPrice() });
      }
    }
  }

  onUpdateCraftCount = (e) => {
    const { onUpdateCraftCount: callback } = this.props;

    if (callback != null) {
      callback(e.target.value);
    }
  };

  onUpdateValuePack = (e) => {
    const { onUpdateValuePack: callback } = this.props;

    if (callback != null) {
      callback(e.target.checked);
    }
  };

  onUpdateOptimizerChoice = (e) => {};

  onUpdateBuffs = (e) => {};

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleMarketPriceFormSubmit = (e) => {
    e.preventDefault();
    const { onMarketPriceChange: callback } = this.props;

    if (callback != null) {
      callback(Math.round(this.state.overrideMarketPrice));
    }
  };

  handleMarketPriceChange = (e) => {
    this.setState({ overrideMarketPrice: e.target.value });
    // console.log("MARKET PRICE CHANGE", e.target.value);
  };

  renderOutput = () => {
    const { recipeTables } = this.props;
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
    if (recipeTables != null) {
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
      <Form onSubmit={this.handleMarketPriceFormSubmit}>
        {/* Total Profit */}
        <Form.Group>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            overlay={
              <Tooltip id="tooltip">
                Profit = Silver spent - Silver earned from market
              </Tooltip>
            }
          >
            <Form.Label className="text">
              Total Profit: {numberWithCommas(Math.round(totalProfit))} silver
            </Form.Label>
          </OverlayTrigger>
          {/* </Form.Group> */}
          <br></br>

          {/* Total Profit */}
          {/* <Form.Group> */}
          <OverlayTrigger
            trigger={["hover", "focus"]}
            overlay={
              <Tooltip id="tooltip">
                Total amount of time spent crafting everything
              </Tooltip>
            }
          >
            <Form.Label className="text">
              Total Crafting Time: {secondsToHms(totalTime)}
            </Form.Label>
          </OverlayTrigger>
          {/* PPS */}
          <br></br>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            overlay={
              <Tooltip id="tooltip">
                Total profit / Time spent crafting
              </Tooltip>
            }
          >
            <Form.Label className="text font-weight-bold">
              Profit per second (PPS): {numberWithCommas(pps.toFixed(2))}
              silver/sec
            </Form.Label>
          </OverlayTrigger>
        </Form.Group>

        <Form.Group>
          {/* Profit per Item */}
          <OverlayTrigger
            trigger={["hover", "focus"]}
            overlay={
              <Tooltip id="tooltip">
                Total profit / # of items sold
              </Tooltip>
            }
          >
            <Form.Text className="text-muted">
              Profit per item: {numberWithCommas(profitPerItem.toFixed(2))}
              silver
            </Form.Text>
          </OverlayTrigger>

          <br></br>

          {/* Market Price */}
          <OverlayTrigger
            trigger={["hover", "focus"]}
            overlay={
              <Tooltip id="tooltip">
                How much it can be sold for... Last Updated:{" "}
                {marketPriceLastUpdated}
              </Tooltip>
            }
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
                value={this.state.overrideMarketPrice}
                onChange={this.handleMarketPriceChange}
                // isInvalid={!!errors.username}
              />
              <Form.Text className="text-muted">
                Press 'Enter' after changing the market price to re-calculate
                costs.
              </Form.Text>
            </InputGroup>
          </OverlayTrigger>
        </Form.Group>
      </Form>
    );
  };

  renderShoppingCart = () => {
    console.log(
      "Render shopping cart (what you need to buy)",
      this.props.recipeTables
    );

    // Handle null case
    if (this.props.recipeTables == null) {
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Button disabled style={{ textAlign: "center" }}>
            Download shopping list (Feature in-progress)
          </Button>
        </Form.Group>
        <Form.Group>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            overlay={
              <Tooltip id="tooltip">
                What the optimizer suggests you buy to craft the items.
              </Tooltip>
            }
          >
            <Form.Label className={"text font-italic"}>
              Shopping List:
            </Form.Label>
          </OverlayTrigger>{" "}
        </Form.Group>
        <Form.Group>
          {this.props.recipeTables != null &&
            this.props.recipeTables.map((item) => {
              // if (item.activeRecipeId != null) return null; // Only generate form labels for items being bought
              if (item.shoppingCartData == null) return null; // If there is no shopping cart data for this, skip it

              return Object.keys(item.shoppingCartData).map((key) => {

                const {
                  action,
                  expectedCount,
                  individualPrice,
                } = item.shoppingCartData[key];
                if (action !== 'Buy') return null
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

  renderInput = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* Craft COunt */}
        <Form.Group controlId="formCraftCount">
          <Form.Label>How many would you like to craft?</Form.Label>
          <Form.Control
            onChange={this.onUpdateCraftCount}
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
            onChange={this.onUpdateValuePack}
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
            <OverlayTrigger
              trigger={["hover", "focus"]}
              overlay={
                <Tooltip id="tooltip">
                  Maximize the silver earned per second (a.k.a Profit Per
                  Second)!
                </Tooltip>
              }
            >
              <Button variant="primary">PPS</Button>
            </OverlayTrigger>

            <OverlayTrigger
              trigger={["hover", "focus"]}
              overlay={
                <Tooltip id="tooltip">
                  (Not implemented) Maximize the total amount of profit (at the
                  cost of time)!
                </Tooltip>
              }
            >
              <Button disabled variant="secondary">
                Total Profit
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              trigger={["hover", "focus"]}
              overlay={
                <Tooltip id="tooltip">
                  (Not implemented) Maximize the total amount of EXP generated!
                </Tooltip>
              }
            >
              <Button disabled variant="secondary">
                EXP
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </Form.Group>
      </Form>
    );
  };

  renderBuffsInput = () => {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon2">
              Cooking Time Reduction
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
      </Form>
    );
  };

  render() {
    return (
      /**
       * Input Types:
       * One of the two are necessary:
       * - How many you want to make
       * - How much silver you have
       *
       * Switch between the three different types of calculations.
       * For now only enable PPH (price per hour) calculations.
       * Disable the other two possible buttons on the switch
       *
       * Applied Buffs
       */
      <React.Fragment>
        <Accordion defaultActiveKey="0">
          {/* Card 3 */}
          <Card>
            <Card.Header style={{backgroundColor: 'rgb(230, 230, 230'}}>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Total Profit (Output)
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{this.renderOutput()}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <br></br>
        <Accordion defaultActiveKey="0">
          {/* Card 1 */}
          <Card>
            <Card.Header style={{backgroundColor: 'rgb(230, 230, 230'}}>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Input
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{this.renderInput()}</Card.Body>
            </Accordion.Collapse>
          </Card>
          {/* Card 2 */}
          {/* <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Your Active Buffs
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>{this.renderBuffsInput()}</Card.Body>
            </Accordion.Collapse>
          </Card> */}

          <Card>
            <Card.Header style={{backgroundColor: 'rgb(230, 230, 230'}}>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                What you need to buy
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>{this.renderShoppingCart()}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </React.Fragment>
    );
  }
}

const RecipesSidebar = withRouter(sidebar);
export default RecipesSidebar;
