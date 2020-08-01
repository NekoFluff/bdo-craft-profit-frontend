import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import RecipesDashboard from "../components/recipesDashboard";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "../css/Dashboard.css";
import RecipesSidebar from "../components/recipesSidebar";
import Sticky from "react-stickynode";

class RecipesPage extends Component {
  state = {
    product: "",
  };

  componentDidMount() {
    this.setState({ product: this.props.match.params.item });
  }

  componentDidUpdate(prevProps) {
    const newItem = this.props.match.params.item;
    if (
      this.props.location.pathname != prevProps.location.pathname &&
      this.state.product != newItem
    ) {
      const oldItem = prevProps.match.params.item;
      this.setState({ product: newItem });
    }
  }

  onSearch = (event, data) => {
    this.setState({ product: data.suggestionValue });
    this.props.history.push("/recipes/" + data.suggestionValue);
  };

  render() {
    return (
      <Container fluid>
        {/* <Row> */}
        <div className="p-3" align="center">
          <SearchBar onSearch={this.onSearch} />
        </div>
        {/* </Row> */}
        <Row >
          <Col xs={8} md={9} style={{'paddingLeft': 0, 'paddingRight': 0}}>
            <RecipesDashboard product={this.state.product} />
          </Col>
          <Col xs={4} md={3} style={{'paddingLeft': 0, 'paddingRight': 0}}>
            <Sticky className="mt-4" enabled={true} top={50} bottomBoundary={2000}>
              <RecipesSidebar></RecipesSidebar>
            </Sticky>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RecipesPage;
