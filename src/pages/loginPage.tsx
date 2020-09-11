import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";

import ParallaxBackground from "../components/background/ParallaxBackground";
import LoginForm from "../components/userForms/LoginForm";
import BackgroundImage from "../images/bg1.png";
import CommonPage from "./commonPage";

type LoginPageProps = {} & RouteComponentProps<{ item: string }>;
type LoginPageState = {};

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  render() {
    return (
      <CommonPage>
        <ParallaxBackground backgroundImage={`url(${BackgroundImage})`}>
          <Container className="h-100">
            <Row className="h-100 justify-content-center align-items-center">
              <div
                className="col-12 col-md-9 col-lg-6"
                style={{ textAlign: "center" }}
              >
                <LoginForm />
                {/* <LoginTest /> */}
              </div>
            </Row>
          </Container>
        </ParallaxBackground>
      </CommonPage>
    );
  }
}

export default withRouter(LoginPage);
