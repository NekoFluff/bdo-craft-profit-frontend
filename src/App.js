import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';
import axios from 'axios'
import SearchBar from './components/searchbar';

class App extends Component {
  state = {  }

  async componentDidMount() {
    try {
      const promise = await axios.get('http://localhost:5000/api/recipes?item=Acacia%20Plywood');
      const {data: recipes} = promise;
      console.log(recipes)
    } catch (e) {
      console.log(e)
    }
  }

  render() { 
    return (
      <main className="container">
        <SearchBar></SearchBar>
        <Counter></Counter>
      </main>
    );
  }
}

export default App;
