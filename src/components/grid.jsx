
import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
// Grid information: https://getbootstrap.com/docs/4.1/layout/grid/
// React-boostrap Input Group: https://react-bootstrap.github.io/components/input-group/

class GridSample extends Component {
  state = {};
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm">One of three columns</div>
          <div class="col-sm">One of three columns</div>
          <div class="col-sm">
          <InputGroup className="mb-3">
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

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
          </div>
        </div>
      </div>
    );
  }
}

export default GridSample;
