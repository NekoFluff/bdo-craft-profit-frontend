import React, { useCallback, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import CommonPage from "./commonPage";
import Background from "../components/Background";
import BackgroundImage from "../images/webb.png";

type NotFoundPageProps = {} & RouteComponentProps<{ item: string }>;

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  return (
    <CommonPage>
      <Background backgroundImage={`url(${BackgroundImage})`}>
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
      </Background>
    </CommonPage>
  );
};

export default withRouter(NotFoundPage);
