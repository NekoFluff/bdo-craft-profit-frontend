import "../scss/RecipesDashboardSidebar.scss";

import Menu from "./Menu";

import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
// import RecipesSidebar from './recipesSidebar';
import { Form, InputGroup } from "react-bootstrap";

type RecipesDashboardSidebarProps = RouteComponentProps;

class RecipesDashboardSidebar extends React.Component<
  RecipesDashboardSidebarProps,
  {}
> {
  render() {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu
        right
        noOverlay
        customBurgerIcon={false}
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
      >
        <Form>
          <Form.Group>
            <Form.Label className="text">Total Profit: XXX silver</Form.Label>
            <Form.Text className="text-muted">
              Profit per item: XXXX silver
            </Form.Text>
          </Form.Group>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">
                Market Price
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              placeholder={"hello"}
              aria-describedby="inputGroupPrepend"
              name="marketPrice"
              value={0}
              // onChange={this.handleMarketPriceChange}
              // isInvalid={!!errors.username}
            />
            <Form.Text className="text-muted">
              Press 'Enter' after changing the market price to re-calculate
              costs.
            </Form.Text>
          </InputGroup>
        </Form>
      </Menu>
    );
  }
}

export default withRouter(RecipesDashboardSidebar);
