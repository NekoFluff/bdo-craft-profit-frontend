import React, { Component } from 'react';
import SearchBar from '../components/searchbar';
import Recipes from '../components/recipes';

class RecipesPage extends Component {
  state = { 
    product: ""
  }

  onSearch = (event, data) => {
    console.log("ON SEARCH", data)
    this.setState({product: data.suggestionValue})
  }

  render() { 
    return ( 
      <div>
        <div className="p-3" align="center"><SearchBar onSearch={this.onSearch}/></div>
        <Recipes product={this.state.product}/>
      </div>
     );
  }
}
 
export default RecipesPage;