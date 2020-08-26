import React, { Component } from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import { ProfitCalculator } from "bdo-shopping-cart-package";
import { Item } from "bdo-shopping-cart-package";
import { withRouter, RouteComponentProps } from "react-router";
import RecipesSidebarTotalProfitAccordion from "./RecipesSidebarTotalProfitAccordion";
import RecipesSidebarUserInputAccordion from "./RecipesSidebarUserInputAccordion";

type sidebarProps = {
  recipeTables: Item[];
  onUpdateCraftCount: (newCraftCount) => void;
  onUpdateValuePack: (valuePackEnabled) => void;
  onMarketPriceChange: (newMarketPrice) => void;
} & RouteComponentProps;

type sidebarState = {};

class sidebar extends Component<sidebarProps, sidebarState> {
  state: sidebarState = {};

  componentDidMount() {
    ProfitCalculator.valuePackEnabled = true;
  }

  componentWillReceiveProps(newProps) {
    const { recipeTables } = newProps;
    const { recipeTables: oldRecipeTables } = this.props;

    if (recipeTables.length !== 0) {
      const item = recipeTables[0];
      if (item == null) return;
      if (
        oldRecipeTables.length !== 0 &&
        oldRecipeTables[0].name !== recipeTables[0].name
      ) {
        this.setState({ overrideMarketPrice: item.getMarketPrice() });
      }
    }
  }

  onUpdateOptimizerChoice = (e) => {};

  onUpdateBuffs = (e) => {};

  handleSubmit = (e) => {
    e.preventDefault();
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
        <RecipesSidebarTotalProfitAccordion {...this.props} />
        <br></br>
        <RecipesSidebarUserInputAccordion {...this.props} />
      </React.Fragment>
    );
  }
}

const RecipesSidebar = withRouter(sidebar);
export default RecipesSidebar;
