import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "./../helpers/tableIcons";

class MostSearchedItemsTable extends Component {
  state = {
    data: [],
  };

  fetchData = async (pageSize, page) => {
    try {
      console.log("Page:", page, pageSize);
      const promise = await axios.get(
        "http://localhost:5000/api/searchHistory?page=" +
          page +
          "&pageSize=" +
          pageSize
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
          { title: "Name", field: "Name" },
          { title: "Count", field: "Count" },
        ]}
        data={(query) =>
          new Promise(async (resolve, reject) => {
            console.log("Query", query);
            const data = await this.fetchData(query.pageSize, query.page);

            // prepare your data and then call resolve like this:
            resolve({
              data: data.searchHistory, // your data array
              page: data.page, // current page number
              totalCount: data.totalCount, // total row number
            });
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
