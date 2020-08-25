import React, { Component } from "react";
import SearchBar from "../components/SearchBar";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import { withRouter, RouteComponentProps } from "react-router";
import PPSTable from "../components/PPSTable";
import { Container, Row, Col } from "react-bootstrap";

type HomePageProps = {} & RouteComponentProps<{ item: string }>;

type HomePageState = {};

class HomePage extends Component<HomePageProps, HomePageState> {
  render() {
    return (
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
    );
  }
}

export default withRouter(HomePage);
