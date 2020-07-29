import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "../moduls/sidebar.js";
import "../css/Dashboard.css";

const Dash = (props) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            this is a test
          </Col>
        </Row>
      </Container>
    </>
  );
};
const Dashboard = withRouter(Dash);
export default Dashboard;
