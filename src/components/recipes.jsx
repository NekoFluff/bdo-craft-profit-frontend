import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar } from "material-table"; // https://material-table.com/#/
import tableIcons from "../helpers/tableIcons";
import axios from "axios";
import "../css/RecipeTables.css";
import { Chip } from "@material-ui/core";
import ShoppingCart from "./../helpers/ShoppingCart";
import PPHOptimizer from "./../helpers/PPHOptimizer";
class Recipes extends Component {
  state = {
    tables: null,
    // bestRecipeActions: null,
    activeRecipes: {},
  };

  componentDidMount() {
    this.recipeOverrides = {}
    this.shoppingCart = new ShoppingCart(new PPHOptimizer());
  }

  async componentDidUpdate(nextProps) {
    const { product } = this.props;
    // Only update if the props changed
    if (nextProps.product != product) {
      try {
        const promise = await axios.get(
          "http://localhost:5000/api/recipes?item=" + this.props.product
        );
        const { data: recipes } = promise;

        this.parseRecipes(recipes);
      } catch (e) {
        console.log(e);
      }
    }
  }

  selectRecipe(recipe, recipeIdx) {
    // // Re-calculate the path to the recipe
    // const shoppingCartData = this.shoppingCart.setRootRecipe(recipe, 5);
    // console.log(shoppingCartData);
    this.recipeOverrides[recipe.Name] = {
      // 'Action':  bestAction, 
      // 'Action':  'Craft', 
      'Recipe Index': recipeIdx
    }
    // Update active recipes
    let activeRecipes = {};
    this.cascadeActiveRecipe(
      this.shoppingCart.optimizer.optimalActions,
      this.props.product,
      "Craft",
      activeRecipes
    );
    
    this.setState({ activeRecipes });
  }

  selectCraftOrBuy(recipe, tables = null) {

  }

  resetToOptimal(recipes) {
    // TODO: Move to separate method?
    // Find most optimal recipe and the optimal actions for profit
    const bestRecipeActions = this.shoppingCart.optimizer.testRecipes(recipes);
    const rootProduct = recipes[0];

    let bestActionSet = null
    for (const actionSet of bestRecipeActions) {
      if (bestActionSet == null) { bestActionSet = actionSet; continue; } 

      const oldCraftAction = bestActionSet['optimalActions'][rootProduct.Name]['Craft']
      const newCraftAction = actionSet.optimalActions[rootProduct.Name]['Craft']
      const marketPrice = recipes[0]['Market Data']['Market Price']
      if (oldCraftAction.calculateProfit(marketPrice) < newCraftAction.calculateProfit(marketPrice))
        bestActionSet = actionSet
    }
    this.setState({bestRecipeActions})

    console.log("Best Recipe Action Set", bestActionSet);

    // Cascade the active recipe
    // for (const recipeIdx in tables[rootProduct.Name]) {
    //   tables[rootProduct.Name][recipeIdx].selected = (recipeIdx == bestActionSet.recipeIdx ? true : false)
    // }

    let activeRecipes = {};
    this.cascadeActiveRecipe(
      bestActionSet.optimalActions,
      rootProduct.Name,
      "Craft",
      activeRecipes
    );
    console.log("recipes.jsx | Active Recipes:", activeRecipes);
    this.setState({ activeRecipes });
  }

  parseRecipes(recipes) {
    let tables = {};
    let activeRecipes = {};

    // Parse Recipe and prep for the display in table format
    for (const recipe of recipes) {
      // Sort ingredients
      recipe.Ingredients = recipe.Ingredients.sort(function (a, b) {
        return (
          b["Market Data"]["Market Price"] - a["Market Data"]["Market Price"]
        );
      });

      this.addRecipe(tables, recipe);

      for (let ingredient of recipe.Ingredients) {
        this.addRecipe(tables, ingredient);
      }
    }

    console.log("recipes.jsx | Updated Tables", tables);
    this.setState({ tables, activeRecipes });

    this.resetToOptimal(recipes)
  }

  cascadeActiveRecipe(optimalActions, currentItem, actionTaken, activeRecipes = {}) {
    
    // if (this.recipeOverrides[currentItem] != null) {
    //   actionTaken = this.recipeOverrides[currentItem]['Action']
    //   let targetRecipeIndex = this.recipeOverrides[currentItem]['Recipe Index']
    // } 

    const action = optimalActions[currentItem][actionTaken];

    if (action == null) return; // Base case. Return when there is no valid action
    if (actionTaken == "Buy") {
      activeRecipes[currentItem] = {
        recipeIdx: -1,
        craftOrBuy: actionTaken,
      };

      return;
    }

    // Update the activeRecipes dictionary
    for (const recipeIdx in this.state.tables[currentItem]) {
      const recipe = this.state.tables[currentItem][recipeIdx];
      if (recipe == action.recipe["Ingredients"]) {
        activeRecipes[currentItem] = {
          recipeIdx,
          craftOrBuy: actionTaken,
        };
      }
    }

    // Recursively update activeRecipes dictionary using more calls to cascadeActiveRecipe
    for (const ingredient of action.recipe["Ingredients"]) {
      const name = ingredient["Item Name"];
      const ingredientAction = ingredient["Action"];
      this.cascadeActiveRecipe(
        optimalActions,
        name,
        ingredientAction,
        activeRecipes
      );
    }

    return activeRecipes
  }

  addRecipe(tables, item) {
    if (tables[item.Name] == null) {
      tables[item.Name] = [];
    }

    tables[item.Name].push(item.Recipe);
  }

  renderMaterialTables() {
    if (this.state.tables == null) {
      return (
        <h2 style={{ "text-align": "center" }}>
          Use the search bar to select a recipe
        </h2>
      );
    }
    return (
      <div>
        {Object.keys(this.state.tables).map((key, index) => {
          let selectedRecipeIdx;
          let recipe;

          if (key in this.state.activeRecipes) {
            selectedRecipeIdx = this.state.activeRecipes[key].recipeIdx;
            recipe = this.state.tables[key][selectedRecipeIdx] || null
          }
          return (
            <>
              {this.state.activeRecipes[key] ? (
                <div className="m-4" key={index}>
                  <MaterialTable
                    key={index}
                    icons={tableIcons}
                    columns={[
                      { title: "Name", field: "Item Name" },
                      { title: "Amount", field: "Amount" },
                    ]}
                    data={recipe || []} // TODO: Which recipe to choose?
                    title={key}
                    options={{
                      search: false,
                      paging: false,
                      header: recipe != null ? true : false,
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
                              {this.state.tables[key].map((recipe, idx) => {
                                const activeRecipeIdx = this.state
                                  .activeRecipes[key].recipeIdx;
                                const isSelected =
                                  activeRecipeIdx == idx ||
                                  activeRecipeIdx == -1;
                                return (
                                  <Chip
                                    clickable
                                    label={`Recipe #${idx}`}
                                    color={isSelected ? "primary" : "secondary"}
                                    style={{ marginRight: 5 }}
                                    onClick={() => {
                                      console.log(`Clicked recipe# ${idx}`)
                                      this.selectRecipe(this.state.tables[key][idx], idx)
                                    }}
                                  />
                                );
                              })}
                            </div>
                            <div
                              style={{ padding: "20px 0px 0px 0px" }}
                              id="toolbar-container-craft-purchase"
                            >
                              {recipe != null && (
                                <Chip
                                  clickable
                                  label="Craft"
                                  color={
                                    this.state.activeRecipes[key].craftOrBuy ==
                                    "Craft"
                                      ? "primary"
                                      : "secondary"
                                  }
                                  style={{ marginRight: 5 }}
                                  onClick={() => {
                                    console.log("Clicked Craft", this.props);
                                  }}
                                />
                              )}
                              <Chip
                                clickable
                                label="Purchase"
                                color={
                                  this.state.activeRecipes[key].craftOrBuy ==
                                  "Buy"
                                    ? "primary"
                                    : "secondary"
                                }
                                style={{ marginRight: 5 }}
                                onClick={() => {
                                  console.log("Clicked Craft", this.props);
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
              ) : null}
            </>
          );
        })}
      </div>
    );
  }

  render() {
    return <div>{this.renderMaterialTables()}</div>;
  }
}

export default Recipes;
