import React, { Component } from "react";
import SearchBar from "../components/searchbar";
import MostSearchedItemsTable from "../components/mostSearchedItemsTable";
import { withRouter, RouteComponentProps } from 'react-router';
import PPSTable from "../components/ppsTable";
import { Container } from 'react-bootstrap';

type HomePageProps = {
} & RouteComponentProps<{item: string}>

type HomePageState = {}

class HomePage extends Component<HomePageProps, HomePageState> {
  render() {
    return (
      <Container>
        <div className="p-3">
          <SearchBar onSearch={() => {}}/>
        </div>
        <PPSTable></PPSTable>
        <MostSearchedItemsTable></MostSearchedItemsTable>
      </Container>
    );
  }
}

export default withRouter(HomePage);
