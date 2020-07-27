import React, { Component } from "react";
import ReactDOM from "react-dom"; 
import MaterialTable from "material-table"; // https://material-table.com/#/
import tableIcons from '../helpers/tableIcons';
import axios from 'axios'

class Recipes extends Component {
  state = {
    tables: null,
  };

  async componentDidMount() {
    try {
      const promise = await axios.get(
        "http://localhost:5000/api/recipes?item=Acacia%20Plywood"
      );
      const { data: recipe } = promise;
      console.log("Recipe:", recipe);
      this.parseRecipe(recipe);
    } catch (e) {
      console.log(e);
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
      return <h1>No data available</h1>
    }
    return (
      <div>
        {
          Object.keys(this.state.tables).map((key, index) => ( 
            <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "Name", field: "Item Name" },
            { title: "Amount", field: "Amount" },
          ]}
          data={this.state.tables[key] || []}
          title={key}
          editable={{
            isEditable: (rowData) => rowData.Name === "Mehmet", // only Name(a) rows would be editable
            isEditHidden: (rowData) => rowData.Name === "x",
            isDeletable: (rowData) => rowData.Name === "b", // only Name(b) rows would be deletable,
            isDeleteHidden: (rowData) => rowData.Name === "y",
            onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
            onRowUpdateCancelled: (rowData) =>
              console.log("Row editing cancelled"),
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /* setData([...data, newData]); */

                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...newData];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  // setData([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...oldData];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  // setData([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
        />
          ))
        }
      </div>
    )

    
  }

  render() {
    return (
      <div>
        <h1>Recipes</h1>
        {this.renderMaterialTables()}
      </div>
    );
  }
}

export default Recipes;
