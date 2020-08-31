import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import { withRouter, RouteComponentProps } from "react-router";
import PPSTable from "../components/PPSTable";
import { Container, Row, Col } from "react-bootstrap";
import MyNavBar from "./../components/Navbar";
import LoginForm from "../components/LoginForm";
import LoginTest from "../components/LoginTest";

type LoginPageProps = {} & RouteComponentProps<{ item: string }>;
type LoginPageState = {};

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  render() {
    return (
      <React.Fragment>
        <MyNavBar></MyNavBar>
        <h1 className="p-3" style={{ textAlign: "center" }}>
          Craft Profit v0.2.0
        </h1>
        <Container>
          <LoginForm />
          <LoginTest />
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginPage);
