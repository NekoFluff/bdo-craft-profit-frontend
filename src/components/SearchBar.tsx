import "../scss/SearchBar.scss";

// https://github.com/moroshko/react-autosuggest
import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import { API_ENDPOINT } from "../helpers/CONSTANTS";
import { Form } from "react-bootstrap";
import { withRouter, RouteComponentProps } from "react-router";
import _ from "lodash";
import { useSpring, animated } from "react-spring";
import { Scrollbars } from "react-custom-scrollbars";

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

type SearchBarProps = {
  onSearch?: (newProduct) => void;
} & RouteComponentProps;

type SearchBarState = {
  value: string;
  suggestions: string[];
  product: string;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [product, setProduct] = useState("");

  // Component did mount
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const uri = API_ENDPOINT + "/recipes/names";
        console.log("Hello. Search bar loading. URI:", uri);
        const promise = await axios.get(uri);
        recipeNames = promise.data;
        console.log("All Items with Recipes:", recipeNames);
      } catch (e) {
        console.log("Component did mount error:", e);
      }
    };

    asyncFunc();
  }, []);

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => <span>{suggestion}</span>;

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div {...containerProps}>
        <Scrollbars className="custom-scrollbar">{children}</Scrollbars>
      </div>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = _.debounce(({ value }) => {
    setSuggestions(getSuggestions(value));
  }, 500);

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSearch = (event, data) => {
    setProduct(data.suggestionValue);
    goToRecipe(data.suggestionValue);

    if (props.onSearch) {
      props.onSearch(data.suggestionValue);
    }
  };

  const goToRecipe = (itemName) => {
    props.history.push("/recipes/" + itemName);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Search an item to craft",
    value,
    onChange: onChange,
  };

  // Finally, render it!
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        goToRecipe(value);
      }}
    >
      <Autosuggest
        // theme={AutosuggestTheme}
        // className="d-flex p-2 justify-content-center"
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={renderSuggestionsContainer}
        inputProps={inputProps}
        onSuggestionSelected={onSearch}
      />
    </Form>
  );
};

export default withRouter(SearchBar);
