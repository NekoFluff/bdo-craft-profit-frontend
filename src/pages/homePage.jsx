import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import MostSearchedItemsTable from "./../components/mostSearchedItemsTable";
import { withRouter } from 'react-router';

class HomePage extends Component {
  state = {
    product: "",
  };

  onSearch = (event, data) => {
    this.setState({ product: data.suggestionValue });
    this.props.history.push('/recipes/' + data.suggestionValue)
  };

  render() {
    return (
      <div>
        <div className="p-3" align="center">
          <SearchBar onSearch={this.onSearch} />
        </div>
        <MostSearchedItemsTable></MostSearchedItemsTable>
      </div>
    );
  }
}

export default withRouter(HomePage);
