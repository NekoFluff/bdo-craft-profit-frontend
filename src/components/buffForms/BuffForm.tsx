import React, { useState } from "react";
import { Button, Form, Jumbotron, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken, getBuff, updateBuffs } from "../../store/user";
import UnderConstruction from "../common/UnderConstruction";

type BuffFormProps = {
  name: string;
};

const BuffForm: React.FC<BuffFormProps> = (props) => {
  const { name } = props;
  // Hooks
  const buff = useSelector(getBuff(name)); // Data stored in redux
  const authToken = useSelector(getAuthToken()); // Data stored in redux
  const [timeReduction, setTimeReduction] = useState(
    buff ? buff.timeReduction : 0
  ); // Front-end
  const dispatch = useDispatch();

  // Look for changes to the form
  const changeExists = () => {
    return buff ? buff.timeReduction !== timeReduction : true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Send data to backend
    console.log("SEND DATA TO BACKEND");

    const buffs = {
      [name]: {
        timeReduction,
      },
    };

    const headers = {
      "X-Auth-Token": authToken,
    };

    dispatch(updateBuffs(buffs, headers));
  };

  return (
    <React.Fragment>
      <Jumbotron>
        {" "}
        <h1>{`Your ${name} Buffs`}</h1>
        {/* <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p> */}
        {/* <p>
          <Button variant="primary">Learn more</Button>
        </p> */}
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="form-time-reduction">
            <Form.Label>Time Reduction</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              value={timeReduction}
              onChange={(e) => {
                setTimeReduction(parseFloat(e.target.value));
              }}
            />
            <Form.Text className="text-muted">
              Time reduction buffs from all sources (e.g. Clothing/Alchemy
              stones)
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!changeExists()}>
            Save
          </Button>
        </Form>
      </Jumbotron>
      <Row className="justify-content-center">
        <UnderConstruction>
          Additional buff features are being added by these little guys.
        </UnderConstruction>
      </Row>
    </React.Fragment>
  );
};

export default BuffForm;
