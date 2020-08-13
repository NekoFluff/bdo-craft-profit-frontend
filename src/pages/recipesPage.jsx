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
    // const oldItem = prevProps.match.params.item;
    if (
      this.props.location.pathname !== prevProps.location.pathname &&
      this.state.product !== newItem
    ) {
      this.setState({ product: newItem });
    }
  }

  render() {
    return (
      <Container fluid>
        {/* <Row> */}
        <div className="p-3" align="center">
          <SearchBar onSearch={(newProduct) => {
            this.setState({ product: newProduct})
          }}/>
        </div>
        {/* </Row> */}
        <RecipesDashboard product={this.state.product} />
      </Container>
    );
  }
}

export default RecipesPage;
