import React, { Component } from "react";
import ReactDOM from "react-dom"; 
import MaterialTable from "material-table"; // https://material-table.com/#/
import tableIcons from '../helpers/tableIcons';

class Recipes extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Recipes</h1>

        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: 'Adı', field: 'name' },
            { title: 'Soyadı', field: 'surname' },
            { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
            { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
          ]}
          data={[{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }, { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }]}
          title="Demo Title"
          editable={{
            isEditable: (rowData) => rowData.name === "Mehmet", // only name(a) rows would be editable
            isEditHidden: (rowData) => rowData.name === "x",
            isDeletable: (rowData) => rowData.name === "b", // only name(b) rows would be deletable,
            isDeleteHidden: (rowData) => rowData.name === "y",
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
      </div>
    );
  }
}

export default Recipes;
