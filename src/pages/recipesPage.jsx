import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import RecipesDashboard from "../components/recipesDashboard";
import { Container } from "react-bootstrap";
import "../css/Dashboard.css";


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
        <RecipesDashboard product={this.state.product} />
      </Container>
    );
  }
}

export default RecipesPage;
