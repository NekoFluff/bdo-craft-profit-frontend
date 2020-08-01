import React, { Component } from "react";
import MaterialTable, { MTableToolbar } from "material-table"; // https://material-table.com/#/
import tableIcons from "../helpers/tableIcons";
import { Chip } from "@material-ui/core";

class RecipesTable extends Component {
  state = {};
  render() {
    const {productName, item, onRecipeClick, onCraftOrBuyClick } = this.props
    const allRecipes = item.recipes
    const selectedRecipeId = item.activeRecipeId
    const selectedRecipe = allRecipes[selectedRecipeId]
    const craftOrBuy = selectedRecipe.craftOrBuy

    return (
      <div className="m-4">
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "Name", field: "Item Name" },
            { title: "Amount", field: "Amount" },
          ]}
          data={selectedRecipe.ingredients || []} // TODO: Which recipe to choose?
          title={productName}
          options={{
            search: false,
            paging: false,
            header: selectedRecipe != null ? true : false,
          }}
          localization={{
            body: {
              emptyDataSourceMessage:
                "You must gather/purchase this ingredient",
            },
          }}
          components={{
            Toolbar: (props) => (
              <div id="toolbar">
                <MTableToolbar {...props} />
                <div
                  id="toolbar-container"
                  style={{
                    padding: "0px 20px 20px 20px",
                    backgroundColor: "rgb(230, 230, 230)",
                  }}
                >
                  <div id="toolbar-container-recipes">
                    {Object.keys(allRecipes).map((recipe_id, index) => {
                      const isSelected = selectedRecipeId == recipe_id;
                      return (
                        <Chip
                          clickable
                          label={`Recipe #${index}`}
                          color={isSelected ? "primary" : "secondary"}
                          style={{ marginRight: 5 }}
                          onClick={() => {
                            console.log(`Clicked recipe# ${index} | id: ${recipe_id}`);
                            onRecipeClick(productName, recipe_id);
                          }}
                        />
                      );
                    })}
                  </div>
                  <div
                    style={{ padding: "20px 0px 0px 0px" }}
                    id="toolbar-container-craft-purchase"
                  >
                    {selectedRecipe != null && (
                      <Chip
                        clickable
                        label="Craft"
                        color={
                          craftOrBuy == "Craft"
                            ? "primary"
                            : "secondary"
                        }
                        style={{ marginRight: 5 }}
                        onClick={() => {
                          console.log("Clicked Craft", this.props);
                          onCraftOrBuyClick('Craft')
                        }}
                      />
                    )}
                    <Chip
                      clickable
                      label="Purchase"
                      color={
                        craftOrBuy == "Buy"
                          ? "primary"
                          : "secondary"
                      }
                      style={{ marginRight: 5 }}
                      onClick={() => {
                        console.log("Clicked Craft", this.props);
                        onCraftOrBuyClick('Buy')
                      }}
                    />
                  </div>
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
    );
  }
}

export default RecipesTable;
