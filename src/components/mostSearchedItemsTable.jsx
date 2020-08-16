import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "./../helpers/tableIcons";
import { Link } from 'react-router-dom';
import {API_ENDPOINT} from '../helpers/CONSTANTS'

class MostSearchedItemsTable extends Component {
  state = {
    data: [],
  };

  fetchData = async (pageSize, page) => {
    try {
      let url =
      API_ENDPOINT + "/searchHistory?page=" + page + "&pageSize=" + pageSize;
      console.log("Page:", page, pageSize, 'URL:', url);
      const promise = await axios.get(
        url
      );
      console.log("Promise Result: ", promise);
      const { data: mostFrequentSearches } = promise;
      console.log("Most frequent:", mostFrequentSearches);
      return mostFrequentSearches;
    } catch (e) {
      console.log(e);
    }
  };

  parseRecipe(recipe) {
    let tables = {};
    tables[recipe.Name] = recipe.Recipe;

    for (let ingredient of recipe.Ingredients) {
      tables[ingredient.Name] = ingredient.Recipe;
    }
    this.setState({ tables });
  }

  render() {
    return (
      <MaterialTable
        icons={tableIcons}
        columns={[
          { title: "Name", field: "Name", render: (rowData) => (<Link to={{ pathname: `/recipes/${rowData.Name}` }}>{rowData.Name}</Link>) },
          { title: "Count", field: "Count" },
          
        ]}
        data={(query) =>
          new Promise(async (resolve, reject) => {
            const data = await this.fetchData(query.pageSize, query.page);
            // console.log("Query", query.page, parseInt(data.page));

            // prepare your data and then call resolve like this:
            if (data) {
              resolve({
                data: data.searchHistory, // your data array
                page: parseInt(data.page), // current page number
                totalCount: data.totalCount, // total row number
              });
            } else {
              resolve({
                data: [], // your data array
                page: 0, // current page number
                totalCount: 0, // total row number
              });
            }
          })
        }
        title={"Most Searched Items"}
        options={{
          search: false,
        }}
      />
    );
  }
}

export default MostSearchedItemsTable;
