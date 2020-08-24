import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import RecipesDashboard from "../components/recipesDashboard";
import { Container } from "react-bootstrap";
import { withRouter, RouteComponentProps } from 'react-router';

type RecipesPageProps = {
} & RouteComponentProps<{item: string}>

type RecipesPageState = {
  product: string
}

class RecipesPage extends Component<RecipesPageProps, RecipesPageState> {
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
        <div className="p-3" style={{textAlign: 'center'}}>
          <SearchBar onSearch={(newProduct) => {
            this.setState({ product: newProduct })
          }}/>
        </div>
        {/* </Row> */}
        <RecipesDashboard product={this.state.product} />
      </Container>
    );
  }
}
export default withRouter(RecipesPage);
