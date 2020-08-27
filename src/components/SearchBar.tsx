import "../scss/SearchBar.scss";
import "../scss/AutosuggestTheme.scss";

// https://github.com/moroshko/react-autosuggest
import React from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import { API_ENDPOINT } from "../helpers/CONSTANTS";
import { Form } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router";

let recipeNames = [];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : recipeNames.filter((sampleName) => {
        if (sampleName == null) return null;
        else {
          const matches = sampleName.toLowerCase().match(inputValue);
          if (matches == null) return null;
          else return matches.length > 0;
        }
      });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion) => <span>{suggestion}</span>;

type SearchBarProps = {
  onSearch?: (newProduct) => void;
} & RouteComponentProps;

type SearchBarState = {
  value: string;
  suggestions: string[];
  product: string;
};

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    value: "",
    suggestions: [],
    product: "",
  };

  async componentDidMount() {
    try {
      const uri = API_ENDPOINT + "/recipes/names";
      console.log("Hello. Search bar loading. URI:", uri);
      const promise = await axios.get(uri);
      recipeNames = promise.data;
      console.log("All Items with Recipes:", recipeNames);
    } catch (e) {
      console.log("Component did mount error:", e);
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSearch = (event, data) => {
    this.setState({ product: data.suggestionValue });
    this.goToRecipe(data.suggestionValue);

    if (this.props.onSearch) {
      this.props.onSearch(data.suggestionValue);
    }
  };

  goToRecipe = (itemName) => {
    this.props.history.push("/recipes/" + itemName);
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "What would you like to make?",
      value,
      onChange: this.onChange,
    };

    // Finally, render it!
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          this.goToRecipe(this.state.value);
        }}
      >
        <Autosuggest
          // theme={AutosuggestTheme}
          // className="d-flex p-2 justify-content-center"
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSearch}
        />
      </Form>
    );
  }
}

export default withRouter(SearchBar);
