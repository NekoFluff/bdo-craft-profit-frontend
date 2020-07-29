// https://github.com/moroshko/react-autosuggest
import React from 'react';
import Autosuggest from 'react-autosuggest';
import '../css/AutosuggestTheme.css'
import axios from 'axios';

let recipeNames = []

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : recipeNames.filter(sampleName =>
    sampleName.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <span>
    {suggestion}
  </span>
);

class SearchBar extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  async componentDidMount() {
    try {
      console.log('Hello. Search bar loading.')
      const promise = await axios.get(
        "http://localhost:5000/api/recipes/names"
      );
      recipeNames = promise.data
      console.log("Recipe Names:", recipeNames);
      
    } catch (e) {
      console.log('Component did mount error:', e);
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'What would you like to make?',
      value,
      onChange: this.onChange
    };
    
    // Finally, render it!
    return (
      
      <Autosuggest
        // theme={AutosuggestTheme}
        // className="d-flex p-2 justify-content-center"
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.props.onSearch}
      />
    );
  }
}

export default SearchBar