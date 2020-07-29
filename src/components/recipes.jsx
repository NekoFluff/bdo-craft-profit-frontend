import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar } from "material-table"; // https://material-table.com/#/
import tableIcons from "../helpers/tableIcons";
import axios from "axios";
import '../css/RecipeTables.css'
import { Chip } from "@material-ui/core";
class Recipes extends Component {
  state = {
    tables: null,
  };

  async componentDidUpdate(nextProps) {
    const { product } = this.props;
    // Only update if the props changed
    if (nextProps.product != product) {
      try {
        const promise = await axios.get(
          "http://localhost:5000/api/recipes?item=" + this.props.product
        );
        const { data: recipe } = promise;
        this.parseRecipe(recipe);
      } catch (e) {
        console.log(e);
      }
    }
  }

  parseRecipe(recipe) {
    let tables = {};
    tables[recipe.Name] = recipe.Recipe;

    for (let ingredient of recipe.Ingredients) {
      tables[ingredient.Name] = ingredient.Recipe;
    }
    this.setState({ tables });
  }

  renderMaterialTables() {
    if (this.state.tables == null) {
      return <h2 style={{"text-align": "center"}}>Use the search bar to select a recipe</h2>;
    }
    return (
      <div>
        {Object.keys(this.state.tables).map((key, index) => (
          <div className="m-4" key={index}>
          <MaterialTable
            key={index}
            icons={tableIcons}
            columns={[
              { title: "Name", field: "Item Name" },
              { title: "Amount", field: "Amount" },
            ]}
            data={this.state.tables[key] || []}
            title={key}
            options={{
              search: false,
              paging: false,
              header: this.state.tables[key] != null ? true : false
            }}
            localization={{
              body: {
                emptyDataSourceMessage: "You must gather/purchase this ingredient"
              }
            }}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props}/>
                  <div style={{padding: '0px 20px 20px 20px', backgroundColor: "rgb(230, 230, 230)"}}>
                    <Chip label="Craft" color="primary" style={{marginRight: 5}}/>
                    <Chip label="Purchase" color="secondary" style={{marginRight: 5}}/>
                  </div>
                </div>
              ),
            }}
            // editable={{
            //   isEditable: (rowData) => rowData.Name === "Mehmet", // only Name(a) rows would be editable
            //   isEditHidden: (rowData) => rowData.Name === "x",
            //   isDeletable: (rowData) => rowData.Name === "b", // only Name(b) rows would be deletable,
            //   isDeleteHidden: (rowData) => rowData.Name === "y",
            //   onRowAddCancelled: (rowData) =>
            //     console.log("Row adding cancelled"),
            //   onRowUpdateCancelled: (rowData) =>
            //     console.log("Row editing cancelled"),
            //   onRowAdd: (newData) =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         /* setData([...data, newData]); */

            //         resolve();
            //       }, 1000);
            //     }),
            //   onRowUpdate: (newData, oldData) =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         const dataUpdate = [...newData];
            //         const index = oldData.tableData.id;
            //         dataUpdate[index] = newData;
            //         // setData([...dataUpdate]);

            //         resolve();
            //       }, 1000);
            //     }),
            //   onRowDelete: (oldData) =>
            //     new Promise((resolve, reject) => {
            //       setTimeout(() => {
            //         const dataDelete = [...oldData];
            //         const index = oldData.tableData.id;
            //         dataDelete.splice(index, 1);
            //         // setData([...dataDelete]);

            //         resolve();
            //       }, 1000);
            //     }),
            // }}
          />
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderMaterialTables()}
      </div>
    );
  }
}

export default Recipes;
