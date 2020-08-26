// Main packages
import React, { Component } from "react";
import { Events, scrollSpy } from "react-scroll";
import axios from "axios";

// My package
import { ProfitCalculator, ItemManager } from "bdo-shopping-cart-package";
import { Item } from "bdo-shopping-cart-package";

// Helpers
import { API_ENDPOINT } from "../helpers/CONSTANTS";

// Other omponents
import RecipesDashboardButton from "./RecipesDashboardButton";
import RecipesDashboardSidebar from "./RecipesDashboardSidebar";
import RecipesTable from "./RecipesTable";
import MyNavBar from "./navbar";
import SearchBar from "./searchBar";

type DashboardProps = {
  product: string;
  setProduct: any;
};
type DashboardState = {
  recipeTables: Item[];
  openProfitDetails: any;
  craftCount: number;
};
class RecipesDashboard extends Component<DashboardProps, DashboardState> {
  itemManager: ItemManager;

  state: DashboardState = {
    recipeTables: null,
    openProfitDetails: {},
    craftCount: 100,
  };

  componentDidMount() {
    this.itemManager = new ItemManager();
    console.log("Item Manager", this.itemManager);

    Events.scrollEvent.register("begin", function (to, element) {
      console.log("Begin Scroll", arguments);
    });

    Events.scrollEvent.register("end", function (to, element) {
      console.log("End Scroll", arguments);
    });

    scrollSpy.update();
  }

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  async componentDidUpdate(nextProps) {
    const { product: productName } = this.props;
    // Only update if the props changed
    if (nextProps.product !== productName) {
      console.log("New product name:", productName);
      this.setState({ openProfitDetails: {} });
      await this.getData(productName);
    }
  }

  /**
   * Call back-end API to retrives all recipes associated
   * @param {string} productName
   */
  async getData(productName) {
    try {
      // Get the data
      const { data: recipes } = await axios.get(
        API_ENDPOINT + "/recipes?item=" + productName
      );
      console.log("Original Recipes", recipes);
      const items = this.itemManager.parseRecipes(recipes);
      this.itemManager.resetToOptimal();
      console.log("Final Items", items);
      this.updateTables();
    } catch (e) {
      console.log(e);
    }
  }

  updateTables() {
    console.log(
      "Update Tables using data... | (this.itemManager.items): ",
      this.itemManager.items
    );

    // Convert this.itemManager.items into array
    let recipeTables = Object.values(this.itemManager.items);
    recipeTables = recipeTables.filter(function (item) {
      return (
        Object.keys(item.shoppingCartData).length > 0 ||
        item.activeRecipeId !== ""
      );
    });
    recipeTables = recipeTables.sort(function (a, b) {
      return a.depth - b.depth;
    });

    this.setState({ recipeTables });
  }

  renderTables() {
    if (this.state.recipeTables == null && this.itemManager != null) {
      if (this.itemManager.officialProductName == null) {
        return (
          <React.Fragment>
            <h2 style={{ textAlign: "center" }}>
              An unexpected error occured.
            </h2>
            <p style={{ textAlign: "center" }}>
              It seems as if{" "}
              <span className={"font-weight-bold"}>'{this.props.product}'</span>{" "}
              doesn't exist in our database. Please contact me on discord{" "}
              <span className={"font-weight-bold"}>@Kitsune#1040 </span>and let
              me know if you want this item added to the database.
            </p>
          </React.Fragment>
        );
      } else {
        return (
          <h2 style={{ textAlign: "center" }}>
            Use the search bar to select a recipe
          </h2>
        );
      }
    }

    return (
      <div>
        {this.itemManager &&
          this.itemManager.officialProductName &&
          this.state.recipeTables.map((item, index) => {
            return (
              <RecipesTable
                key={`${item.name}`}
                productName={item.name}
                item={item}
                onRecipeClick={(itemName, recipeId, recipePaths) => {
                  for (const path of recipePaths) {
                    this.itemManager.resetRecipePath(itemName, path);
                  }
                  for (const path of recipePaths) {
                    this.itemManager.selectRecipe(itemName, recipeId, path);
                  }
                  this.updateTables();
                }}
                onBuyClick={(itemName, recipePaths) => {
                  for (const path of recipePaths) {
                    this.itemManager.resetRecipePath(itemName, path);
                  }
                  for (const path of recipePaths) {
                    this.itemManager.selectRecipe(itemName, "", path);
                  }
                  this.updateTables();
                }}
                detailsShown={this.state.openProfitDetails[item.name]}
                onProfitDetailsButtonPressed={(itemName) => {
                  const temp = { ...this.state.openProfitDetails };
                  temp[itemName] =
                    temp[itemName] == null || temp[itemName] === false
                      ? true
                      : false;
                  this.setState({ openProfitDetails: temp });
                }}
                itemHasMarketData={(itemName) => {
                  return (
                    this.itemManager.items[itemName].marketData != null ||
                    this.itemManager.items[itemName].isSymbolic
                  );
                }}
              ></RecipesTable>
            );
          })}
      </div>
    );
  }

  renderSidebar() {
    return (
      // <Sticky className="mt-4" enabled={true} top={50}>
      <RecipesDashboardSidebar
        recipeTables={this.state.recipeTables}
        onUpdateCraftCount={(newCraftCount) => {
          this.setState({ craftCount: newCraftCount });
          this.itemManager.recalculate({ craftCount: newCraftCount });
          this.updateTables();
        }}
        onUpdateValuePack={(valuePackEnabled) => {
          ProfitCalculator.valuePackEnabled = valuePackEnabled;
          this.itemManager.resetToOptimal();
          this.updateTables();
        }}
        onMarketPriceChange={(newMarketPrice) => {
          this.itemManager.items[this.itemManager.officialProductName][
            "overrideMarketPrice"
          ] = newMarketPrice;
          this.itemManager.resetToOptimal();
          this.updateTables();
        }}
      ></RecipesDashboardSidebar>
      // </Sticky>
    );
  }

  render() {
    return (
      <>
        {this.renderSidebar()}
        <div id="page-wrap">
          <MyNavBar></MyNavBar>
          <h1 className="p-3" style={{ textAlign: "center" }}>
            Craft Profit v0.2.0
          </h1>
          <RecipesDashboardButton />

          <div className="p-3" style={{ textAlign: "center" }}>
            <SearchBar
              onSearch={(newProduct) => {
                this.props.setProduct(newProduct);
              }}
            />
          </div>
          {this.renderTables()}
        </div>
      </>
    );
  }
}

export default RecipesDashboard;
