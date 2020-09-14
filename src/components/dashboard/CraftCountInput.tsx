import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

import { RootState } from "../../store/reducer";

const CraftCountInput = (props) => {
  const itemName = useSelector(
    (state: RootState) => state.entities.items.rootItem
  );

  return (
    <Form.Group controlId="formCraftCount">
      <Form.Label>
        How many <b>{itemName}</b> would you like to craft?
      </Form.Label>
      <Form.Control
        onChange={props.onUpdateCraftCount}
        type="number"
        placeholder="100 (default)"
      />
      <Form.Text className="text-muted">
        Press 'Enter' after changing the craft count to re-calculate costs.
      </Form.Text>
    </Form.Group>
  );
};

export default CraftCountInput;
