import React, { useCallback, useState } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import {
  Row,
  Col,
  Jumbotron,
  Button,
  ListGroup,
  Tabs,
  Tab,
  Form,
} from "react-bootstrap";
import Background from "../components/Background";
import BackgroundImage from "../images/webb.png";
import CommonPage from "./commonPage";
import BuffForm from "../components/BuffForms/BuffForm";

type UserStatsPageProps = {} & RouteComponentProps<{ item: string }>;

const UserStatsPage: React.FC<UserStatsPageProps> = (props) => {
  const [actionList, setActionList] = useState([
    "Alchemy",
    "Chopping",
    "Cooking",
    "Drying",
    "Filtering",
    "Grinding",
    "Heating",
    "Refinery",
    "Shaking",
    "Simple Alchemy",
    "Simple Cooking",
  ]);
  const renderJumbo = useCallback((action: string) => {
    return <BuffForm name={action} />;
  }, []);

  return (
    <CommonPage>
      <Background backgroundImage={`url(${BackgroundImage})`}>
        {/* STYLE 1 */}
        <div>
          <Tab.Container id="user-stats-container" defaultActiveKey="#Alchemy">
            <Row>
              <Col sm={2}>
                <ListGroup>
                  {actionList.map((action, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      onClick={() => {
                        console.log(`${action} clicked`);
                      }}
                      href={`#${action}`}
                    >
                      {action}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  {actionList.map((action, index) => (
                    <Tab.Pane eventKey={`#${action}`}>
                      {renderJumbo(action)}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>

        {/* Version 2 */}
        {/* <div>
          <Row>
            <Col>
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Home">
                  {renderJumbo()}
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  {renderJumbo()}
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                  {renderJumbo()}
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </div> */}
      </Background>
    </CommonPage>
  );
};

export default withRouter(UserStatsPage);