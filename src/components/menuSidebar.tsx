import "../scss/MenuSidebar.scss";

import { push as Menu } from "react-burger-menu";
import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
// import RecipesSidebar from './recipesSidebar';
import { Form, InputGroup } from "react-bootstrap";

type MyProps = RouteComponentProps;

class MenuSidebar extends React.Component<MyProps, { isOpen: boolean }> {
  state = {
    isOpen: false,
  };
  showSettings(event) {
    event.preventDefault();
    console.log("Show Setting Function TODO");
  }

  onStateChange = (state) => {
    if (this.state.isOpen !== state.isOpen) {
      this.setState({ isOpen: state.isOpen });
    }
  };

  render() {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        isOpen={this.state.isOpen}
        onStateChange={this.onStateChange}
      >
        <NavLink
          to="/"
          className="menu-item"
          onClick={() => {
            this.setState({ isOpen: false });
          }}
        >
          Home
        </NavLink>
        {/* <NavLink to="/recipes" onClick={() => {this.setState({isOpen: false})}}>Recipes</NavLink>
        <NavLink to="/about" onClick={() => {this.setState({isOpen: false})}}>About</NavLink>
        <NavLink to="/contact" onClick={() => {this.setState({isOpen: false})}}>Contact</NavLink> */}

        {/* <a onClick={ this.showSettings } className="menu-item--small">Settings</a> */}
        {/* {renderForm()} */}
        {/* <RecipesSidebar/> */}
        <Form>
          <Form.Group>
            <Form.Label className="text">Total Profit: XXX silver</Form.Label>
            <Form.Text className="text-muted">
              Profit per item: XXXX
              silver
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
                placeholder={'hello'}
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

export default withRouter(MenuSidebar);
