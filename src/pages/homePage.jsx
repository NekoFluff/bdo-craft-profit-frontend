import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import MostSearchedItemsTable from "./../components/mostSearchedItemsTable";

class HomePage extends Component {
  state = {
    product: "",
  };

  onSearch = (event, data) => {
    this.setState({ product: data.suggestionValue });
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

export default HomePage;
