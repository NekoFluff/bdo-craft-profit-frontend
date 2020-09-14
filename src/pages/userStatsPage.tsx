import React, { useCallback, useState } from "react";
import { Col, Container, ListGroup, Row, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router";

import ParallaxBackground from "../components/background/ParallaxBackground";
import BuffForm from "../components/buffForms/BuffForm";
import BackgroundImage from "../images/webb.png";
import { getCurrentUser } from "../store/user";
import CommonPage from "./commonPage";

type UserStatsPageProps = {} & RouteComponentProps<{ item: string }>;

const UserStatsPage: React.FC<UserStatsPageProps> = (props) => {
  const user = useSelector(getCurrentUser());

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
      {user.accessToken == null ? (
        <Redirect to="/login" />
      ) : (
        <ParallaxBackground
          backgroundRepeat
          backgroundImage={`url(${BackgroundImage})`}
        >
          {/* STYLE 1 */}
          <Container className="m-3" fluid>
            <Tab.Container
              id="user-stats-container"
              defaultActiveKey="#Alchemy"
            >
              <Row>
                <Col sm={2}>
                  <ListGroup>
                    {actionList.map((action, index) => (
                      <ListGroup.Item
                        className="nav-link"
                        key={index}
                        // action
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
          </Container>

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
        </ParallaxBackground>
      )}
    </CommonPage>
  );
};

export default withRouter(UserStatsPage);
