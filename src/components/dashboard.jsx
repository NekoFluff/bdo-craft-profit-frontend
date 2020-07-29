import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import "../css/Dashboard.css";
import RecipesPage from "../pages/recipesPage";
import RecipesSidebar from "./recipesSidebar";

const Dash = (props) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={10} id="page-content-wrapper">
            <RecipesPage></RecipesPage>
          </Col>
          <Col xs={2} id="sidebar-wrapper">
            <RecipesSidebar></RecipesSidebar>
          </Col>
        </Row>
      </Container>
    </>
  );
};
const Dashboard = withRouter(Dash);
export default Dashboard;
