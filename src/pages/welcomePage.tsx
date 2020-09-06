import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";
import LeftBackgroundImage from "../images/double-bubble.png";
import RightBackgroundImage from "../images/double-bubble-dark.png";
import Background from "../components/Background";
import CommonPage from "./commonPage";
import "../scss/WelcomePage.scss";

type WelcomePageProps = {} & RouteComponentProps<{ item: string }>;

const WelcomePage: React.FC<WelcomePageProps> = (props) => {
  return (
    <CommonPage>
      {/* <Background backgroundImage={`url(${BackgroundImage})`}/> */}
      <Row className="h-100">
        <Col
          className="d-flex h-100 justify-content-center align-items-center welcome-page__background"
          style={{
            backgroundImage: `url(${LeftBackgroundImage})`,
          }}
        >
          <Button
            className="welcome-page__stat-button"
            variant="dark"
            onClick={() => {
              props.history.push("/me");
            }}
          >
            Fill out your stats!
          </Button>
        </Col>
        <Col
          className="d-flex h-100 justify-content-center align-items-center welcome-page__background"
          style={{
            backgroundImage: `url(${RightBackgroundImage})`,
          }}
        >
          <Button
            className="welcome-page__profit-button"
            variant="light"
            onClick={() => {
              props.history.push("/");
            }}
          >
            Calculate profits
          </Button>
        </Col>
      </Row>
    </CommonPage>
  );
};

export default withRouter(WelcomePage);
