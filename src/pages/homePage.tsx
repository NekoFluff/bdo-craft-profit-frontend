import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import { withRouter, RouteComponentProps } from "react-router";
import PPSTable from "../components/PPSTable";
import { Container, Row, Col } from "react-bootstrap";
import MyNavBar from "./../components/Navbar";

type HomePageProps = {} & RouteComponentProps<{ item: string }>;

type HomePageState = {};

class HomePage extends Component<HomePageProps, HomePageState> {
  render() {
    return (
      <React.Fragment>
        <MyNavBar></MyNavBar>
        <h1 className="p-3" style={{ textAlign: "center" }}>
          Craft Profit v0.2.0
        </h1>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <SearchBar />
            </Col>
          </Row>
          <Row>
            <Col>
              <PPSTable />
            </Col>
          </Row>
          <Row>
            <Col>
              <MostSearchedItemsTable></MostSearchedItemsTable>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(HomePage);
