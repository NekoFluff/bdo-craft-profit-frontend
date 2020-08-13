import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import MostSearchedItemsTable from "./../components/mostSearchedItemsTable";
import { withRouter } from 'react-router';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="p-3" align="center">
          <SearchBar />
        </div>
        <MostSearchedItemsTable></MostSearchedItemsTable>
      </div>
    );
  }
}

export default withRouter(HomePage);
