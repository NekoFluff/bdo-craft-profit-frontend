import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";

import ParallaxBackground from "../components/background/ParallaxBackground";
import BackgroundImage from "../images/webb.png";
import CommonPage from "./commonPage";

type NotFoundPageProps = {} & RouteComponentProps<{ item: string }>;

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  return (
    <CommonPage>
      <ParallaxBackground
        backgroundRepeat
        backgroundImage={`url(${BackgroundImage})`}
      >
        <Container
          fluid
          style={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Row className="align-content-center">
            <Col>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "Bebas Neue",
                  fontSize: "3rem",
                }}
              >
                Sorry but this page doesn't exist!
              </div>
            </Col>
          </Row>
        </Container>
      </ParallaxBackground>
    </CommonPage>
  );
};

export default withRouter(NotFoundPage);
