import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';
import SearchBar from './components/searchbar';
import Recipes from './components/recipes';
import GridSample from './components/grid';

class App extends Component {
  state = { 
    product: "Acacia Plywood"
  }

  onSearch = (event, data) => {
    console.log("ON SEARCH", data)
    this.setState({product: data.suggestionValue})
  }

  render() { 
    return (
      <main className="container">
        <h1 className="p-3" align="center"> Craft Profit </h1>
        {/* <div className="d-flex">I'm a flexbox container!</div> */}
        <div className="p-3" align="center"><SearchBar onSearch={this.onSearch}/></div>
        
        {/* <Counter></Counter> */}
        <Recipes product={this.state.product}/>
        <GridSample></GridSample>
      </main>
    );
  }
}

export default App;
