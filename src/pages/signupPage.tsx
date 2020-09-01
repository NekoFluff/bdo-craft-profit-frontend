import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import LoginTest from "../components/LoginTest";
import CommonPage from "./commonPage";

type LoginPageProps = {} & RouteComponentProps<{ item: string }>;
type LoginPageState = {};

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  render() {
    return (
      <CommonPage>
        <h1 className="p-3" style={{ textAlign: "center" }}>
          Craft Profit v0.2.0
        </h1>
        <Container>
          <LoginForm />
          <LoginTest />
        </Container>
      </CommonPage>
    );
  }
}

export default withRouter(LoginPage);
