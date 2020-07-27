import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';
import SearchBar from './components/searchbar';
import Recipes from './components/recipes';

class App extends Component {
  state = {  }

  render() { 
    return (
      <main className="container">
        <SearchBar></SearchBar>
        <Counter></Counter>
        <Recipes/>
      </main>
    );
  }
}

export default App;
