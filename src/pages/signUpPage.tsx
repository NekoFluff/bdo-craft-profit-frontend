import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router";
import ParallaxBackground from "../components/background/ParallaxBackground";
import SignUpForm from "../components/userForms/SignUpForm";
import BackgroundImage from "../images/bg1.png";
import CommonPage from "./commonPage";

type SignUpPageProps = {} & RouteComponentProps<{ item: string }>;
type SignUpPageState = {};

class SignUpPage extends Component<SignUpPageProps, SignUpPageState> {
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
                <SignUpForm />
              </div>
            </Row>
          </Container>
        </ParallaxBackground>
      </CommonPage>
    );
  }
}

export default withRouter(SignUpPage);
