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

  componentDidMount() {
    this.setState({ product: this.props.match.params.item });
  }

  componentDidUpdate(prevProps) {
    const newItem = this.props.match.params.item;
    if (this.props.location.pathname != prevProps.location.pathname && this.state.product != newItem) {
      const oldItem = prevProps.match.params.item;
      this.setState({ product: newItem });
    }
  }

  onSearch = (event, data) => {
    this.setState({ product: data.suggestionValue });
    this.props.history.push('/recipes/' + data.suggestionValue)
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
