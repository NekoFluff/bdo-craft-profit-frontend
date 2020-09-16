import axios from "axios";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
// https://github.com/moroshko/react-autosuggest
import Autosuggest from "react-autosuggest";
import { Form, Spinner } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RouteComponentProps, withRouter } from "react-router";

import { API_ENDPOINT } from "../../helpers/CONSTANTS";

import "../../scss/SearchBar.scss";

let allRecipes = [];
let getRecipeImage = {};

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value) => {
  if (typeof value !== "string") {
    return [];
  }
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : allRecipes
        .filter((sample) => {
          if (sample == null || sample["_id"] == null) return null;
          else {
            const matches = sample["_id"].toLowerCase().match(inputValue);
            if (matches == null) return null;
            else return matches.length > 0;
          }
        })
        .map((value) => {
          return value["_id"];
        });
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion;

type SearchBarProps = {
  onSearch?: (newProduct) => void;
} & RouteComponentProps;

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingData, setLoadingData] = useState(true);

  // Component did mount
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const uri = API_ENDPOINT + "/recipes/names";
        const promise = await axios.get(uri);
        allRecipes = promise.data;
        for (const recipe of allRecipes) {
          getRecipeImage[recipe["_id"]] = recipe["Image"];
        }
        console.log("All Items with Recipes:", allRecipes);
        setLoadingData(false);
      } catch (e) {
        console.log("Component did mount error:", e);
      }
    };

    asyncFunc();
  }, []);

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <span>
      <LazyLoadImage
        // alt={image.alt}
        height={"20px"}
        width={"20px"}
        src={getRecipeImage[suggestion]} // use normal <img> attributes as props
        style={{ marginRight: "10px" }}
      />
      {suggestion}
    </span>
  );

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div {...containerProps}>
        <Scrollbars
          className="custom-scrollbar"
          style={{
            height: `${children ? children.props.items.length * 48 : 1000}px`,
          }}
        >
          {children}
        </Scrollbars>
      </div>
    );
  };

  const onChange = (event, { newValue }) => {
    // console.log("On Change:", newValue);
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = useCallback(
    _.debounce(({ value }) => {
      console.log("On Suggestions Fetch:", value);

      setSuggestions(getSuggestions(value));
    }, 500),
    []
  );

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSearch = (event, data) => {
    console.log("On Search", data);
    const name = data.suggestionValue;
    goToRecipe(name);

    if (props.onSearch) {
      props.onSearch(name);
    }
  };

  const goToRecipe = (itemName: string) => {
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
      className="search-bar__form"
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
      {isLoadingData && (
        <Spinner
          className="search-bar__spinner"
          animation="border"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Form>
  );
};

export default withRouter(SearchBar);
