import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";

import ParallaxBackground from "../components/background/ParallaxBackground";
import ForgotPasswordForm from "../components/userForms/ForgotPasswordForm";
import BackgroundImage from "../images/bg1.png";
import CommonPage from "./commonPage";

type ForgotPasswordPageProps = {} & RouteComponentProps<{ item: string }>;
type ForgotPasswordPageState = {};

class ForgotPasswordPage extends Component<
  ForgotPasswordPageProps,
  ForgotPasswordPageState
> {
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
                <ForgotPasswordForm />
                {/* <LoginTest /> */}
              </div>
            </Row>
          </Container>
        </ParallaxBackground>
      </CommonPage>
    );
  }
}

export default withRouter(ForgotPasswordPage);
