import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import Recipes from "../components/recipes";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../css/Dashboard.css";
import RecipesSidebar from '../components/recipesSidebar';
class RecipesPage extends Component {
  state = {
    product: "",
  };

  onSearch = (event, data) => {
    console.log("ON SEARCH", data);
    this.setState({ product: data.suggestionValue });
  };

  render() {
    return (
      <Container fluid>
        {/* <Row> */}
          <div className="p-3" align="center">
            <SearchBar onSearch={this.onSearch} />
          </div>
        {/* </Row> */}
        <Row>
          <Col xs={10} id="page-content-wrapper">
            <Recipes product={this.state.product} />
          </Col>
          <Col xs={2} id="sidebar-wrapper">
            <RecipesSidebar></RecipesSidebar>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RecipesPage;
