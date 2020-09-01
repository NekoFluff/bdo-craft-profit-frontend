import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Container, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import BackgroundImage from "../images/bg1.png";
import Background from "../components/Background";
import CommonPage from "./commonPage";

type LoginPageProps = {} & RouteComponentProps<{ item: string }>;
type LoginPageState = {};

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  render() {
    return (
      <CommonPage>
        <Background backgroundImage={`url(${BackgroundImage})`}>
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
        </Background>
      </CommonPage>
    );
  }
}

export default withRouter(LoginPage);
