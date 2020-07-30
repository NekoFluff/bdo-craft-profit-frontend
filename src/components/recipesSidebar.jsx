import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import "../css/Dashboard.css";
import {
  InputGroup,
  FormControl,
  Form,
  Col,
  Row,
  Button,
} from "react-bootstrap";

const sidebar = (props) => {
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
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Recalculate
        </Button>
      </Form>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
  );
};
const RecipesSidebar = withRouter(sidebar);
export default RecipesSidebar;
