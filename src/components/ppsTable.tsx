import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import tableIcons from "../helpers/tableIcons";
import { Link } from 'react-router-dom';
import {API_ENDPOINT} from '../helpers/CONSTANTS'
import numberWithCommas from '../helpers/numberWithCommas';

class PPSTable extends Component {
  state = {
    data: [],
    actionFilters: ['Chopping'], 
    sortBy: 'ppsValuePackEnabled', //ppsValuePackDisabled
    sortOrder: -1 // -1 is descending, 1 is ascending
  };

  fetchData = async (pageSize, page) => {
    try {
      let url = `${API_ENDPOINT}/pps?page=${page}&pageSize=${pageSize}&actionFilters=${this.state.actionFilters}&sortBy=${this.state.sortBy}&sortOrder=${this.state.sortOrder}`;
      console.log("Page:", page, pageSize, 'URL:', url);
      const promise = await axios.get(url);
      console.log("Promise Result: ", promise);
      const { data } = promise;
      console.log("promise data:", data);
      return data;
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
        style={{marginBottom: "20px"}}
        icons={tableIcons}
        columns={[
          {
            title: "Name",
            field: "Name",
            render: (rowData) => (
              <Link to={{ pathname: `/recipes/${rowData.Name}` }}>
                {rowData.Name}
              </Link>
            ),
          },
          { title: "Action", field: "valuePackEnabledAction" },

          {
            title: "PPS",
            field: "ppsValuePackEnabled",
            render: (rowData) => (
              <div>{numberWithCommas(rowData.ppsValuePackEnabled)} silver/sec</div>
            ),
          },
          {
            title: "Profit per item sold",
            field: "profitValuePackEnabled",
            render: (rowData) => (
              <div>{numberWithCommas(rowData.profitValuePackEnabled)} silver</div>
            ),
          },
          { title: "Last Updated", field: "Last Updated" },
        ]}
        data={(query) =>
          new Promise(async (resolve, reject) => {
            const data = await this.fetchData(query.pageSize, query.page);
            // console.log("Query", query.page, parseInt(data.page));
            // prepare your data and then call resolve like this:
            if (data) {
              resolve({
                data: data.ppsData, // your data array
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
        title={"Items with highest Profit Per Second (PPS)"}
        options={{
          search: false,
        }}
      />
    );
  }
}

export default PPSTable;
