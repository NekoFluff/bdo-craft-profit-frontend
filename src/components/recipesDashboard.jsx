import React, { Component } from "react";

import axios from "axios";
import { ProfitCalculator, ItemManager } from "bdo-shopping-cart-package";
import RecipesTable from "./recipesTable";
import { Events, scrollSpy } from "react-scroll";
import { Row, Col } from "react-bootstrap";
import RecipesSidebar from "../components/recipesSidebar";
import Sticky from "react-stickynode";
import { API_ENDPOINT } from "../helpers/CONSTANTS";

class RecipesDashboard extends Component {
  state = {
    recipeTables: null,
    openProfitDetails: {},
    craftCount: 100,
  };

  componentDidMount() {
    this.itemManager = new ItemManager()
    this.itemManager.craftCount = this.state.craftCount
    console.log('Item Manager', this.itemManager)

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
      const { data: recipes } = await axios.get(API_ENDPOINT + "/recipes?item=" + productName);

      const items = this.itemManager.parseRecipes(recipes);
      console.log("Final Items", items);
      this.updateTables()
    } catch (e) {
      console.log(e);
    }
  }

  updateTables() {
    console.log("Update Tables using data... | (this.itemManager.items): ", this.itemManager.items);

    // Convert this.itemManager.items into array
    let recipeTables = Object.values(this.itemManager.items);
    recipeTables = recipeTables.filter(function (item) {
      return Object.keys(item.shoppingCartData).length > 0 || item.activeRecipeId != null;
    });
    recipeTables = recipeTables.sort(function (a, b) {
      return a.depth - b.depth;
    });

    if (Object.keys(recipeTables).length == 0) {
      recipeTables = null
    }
    
    this.setState({ recipeTables });
  }
  
  renderTables() {
    if (this.state.recipeTables == null && this.itemManager != null) {
      if (this.itemManager.officialProductName == null) {
        return (
          <React.Fragment>
            <h2 style={{ "textAlign": "center" }}>
              An unexpected error occured.
            </h2>
            <p style={{ "textAlign": "center" }}>
              It seems as if{" "}
              <span className={"font-weight-bold"}>'{this.props.product}'</span>{" "}
              doesn't exist in our database. Please contact me on discord{" "}
              <span className={"font-weight-bold"}>@Kitsune#1040 </span>and
              let me know if you want this item added to the database.
            </p>
          </React.Fragment>
        );
      } else {
        return (
          <h2 style={{ "text-align": "center" }}>
            Use the search bar to select a recipe
          </h2>
        );
      }
    }

    return (
      <div>
        {this.itemManager && this.itemManager.officialProductName && this.state.recipeTables.map((item, index) => {
          return (
            <RecipesTable
              key={`${item.name}`}
              productName={item.name}
              item={item}
              onRecipeClick={(itemName, recipeId, recipePaths) => {
                for (const path of recipePaths) {
                  this.itemManager.resetRecipePath(itemName, path)
                }
                for (const path of recipePaths) {
                  this.itemManager.selectRecipe(itemName, recipeId, path)
                }
                this.updateTables()
              }}
              onBuyClick={(itemName, recipePaths) => {
                for (const path of recipePaths) {
                  this.itemManager.resetRecipePath(itemName, path)
                }
                for (const path of recipePaths) {
                  this.itemManager.selectRecipe(itemName, null, path)
                }
                this.updateTables()

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
                return this.itemManager.items[itemName].marketData != null || this.itemManager.items[itemName].isSymbolic
              }} 
            ></RecipesTable>
          );
        })}
      </div>
    );
  }

  renderSidebar() {

    return (
      <Sticky
            className="mt-4"
            enabled={true}
            top={50}
          >
            <RecipesSidebar
              recipeTables={this.state.recipeTables}
              onUpdateCraftCount={(newCraftCount) => {
                this.setState({ craftCount: newCraftCount });
                this.itemManager.craftCount = newCraftCount
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
            ></RecipesSidebar>
          </Sticky>
    )
  }

  render() {
    return (
      <Row>
        <Col xs={8} md={9} style={{ paddingLeft: 0, paddingRight: 0 }}>
          {this.renderTables()}
        </Col>
        <Col xs={4} md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
          {this.renderSidebar()}
        </Col>
      </Row>
    );
  }
}

export default RecipesDashboard;
