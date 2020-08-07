import React, { Component } from "react";

import axios from "axios";
import ShoppingCart from "../helpers/ShoppingCart";
import PPHOptimizer from "../helpers/PPHOptimizer";
import RecipesTable from "./recipesTable";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import RecipesSidebar from "../components/recipesSidebar";
import Sticky from "react-stickynode";
import ProfitCalculator from './../helpers/ShoppingCartProfitCalculator';

class Item {
  /**
   * Create a new Item object
   * @param {object} initialItemData e.g {Action: string, Ingredients: [], Market Data: {}, Name: string, Quantity Produced: float, Recipe: [], Time to Produce: float}
   */
  constructor(initialItemData) {
    // console.log("Initial Item Data", initialItemData)
    this.name = initialItemData["Name"];
    this.marketData = initialItemData["Market Data"];
    this.recipes = {};
    this.usedInRecipes = [];
    this.activeRecipeId = null;
    this.depth = initialItemData["depth"] || -1;
    this.addRecipe(
      initialItemData["_id"],
      initialItemData["Name"],
      initialItemData["Recipe"],
      initialItemData["Quantity Produced"],
      initialItemData["Time to Produce"]
    );
  }

  getMarketPrice() {
    return this.marketData["Market Price"];
  }

  addRecipe(_id, productName, recipe, quantityProduced, timeToProduce) {
    if (this.recipes[_id] == null)
      this.recipes[_id] = new Recipe(
        productName,
        recipe,
        quantityProduced,
        timeToProduce
      );
    // this.printRecipes()
  }

  /**
   *
   * @param {string} actionTaken // Craft or Buy
   * @param {string} parentRecipeId // What recipe is this item used in?
   * @param {string} activeRecipeId // One of the recipes to craft this item
   */
  addUse(actionTaken, parentName, parentRecipeId, activeRecipeId) {
    for (const { parentUsedAlready } of this.usedInRecipes) {
      if (parentUsedAlready == parentRecipeId) return;
    }

    this.usedInRecipes.push({
      actionTaken,
      parentName,
      parentRecipeId,
    });
    this.activeRecipeId = activeRecipeId;
  }

  selectRecipe(recipeId) {
    this.activeRecipeId = recipeId;
  }

  resetUses = () => {
    this.usedInRecipes = [];
    this.activeRecipeId = null;
  };

  printRecipes() {
    console.log("Recipes:", this.recipes);
  }
}

class Recipe {
  constructor(
    productName,
    ingredients,
    quantityProduced = null,
    timeToProduce = null
  ) {
    this.productName = productName;
    this.ingredients = ingredients;
    this.quantityProduced = quantityProduced;
    this.timeToProduce = timeToProduce;
  }

  printIngredients() {
    console.log("Ingredients:", this.ingredients);
  }
}

class RecipesDashboard extends Component {
  state = {
    items: null,
    recipeTables: null,
    openProfitDetails: {},
    craftCount: 100,
  };

  componentDidMount() {
    this.shoppingCart = new ShoppingCart(new PPHOptimizer());

    Events.scrollEvent.register("begin", function (to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function (to, element) {
      console.log("end", arguments);
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
    console.log("New product name:", productName);
    if (nextProps.product != productName) {
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
      const { data: recipes } = await axios.get(
        "http://localhost:5000/api/recipes?item=" + productName
      );
      this.originalRecipesData = recipes;
      this.sortRecipes(recipes);
      this.parseRecipes(recipes);
      console.log("Final Items", this.items);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * @deprecated No longer need to sort the recipes object
   * @param {object} recipes
   */
  sortRecipes(recipes) {
    for (let recipe of recipes) {
      // Sort ingredients
      recipe.Ingredients = recipe.Ingredients.sort(function (a, b) {
        return (
          b["Market Data"]["Market Price"] - a["Market Data"]["Market Price"]
        );
      });
    }
  }

  /**
   * Parses the information retrieved from the backend to produce the state object 'items'
   * @param {arr} recipes
   */
  parseRecipes(recipes) {
    this.items = {};
    console.log("recipes.jsx | Orignal Recipes Data: ", recipes);

    // Parse Recipe and prep for the display in table format
    for (const recipe of recipes) {
      this.addItem(this.items, recipe);

      for (let ingredient of recipe.Ingredients) {
        this.addItem(this.items, ingredient);
      }
    }

    // Get optimal actions
    console.log("This items", this.items);
    this.resetToOptimal();
    return this.items;
  }

  /**
   *
   * @param {object} items {key: item name, value: Item object}
   * @param {*} item
   */
  addItem(items, item) {
    if (items[item.Name] == null) {
      items[item.Name] = new Item(item);
    } else {
      items[item.Name].addRecipe(
        item["_id"],
        item["Name"],
        item.Recipe,
        item["Quantity Produced"],
        item["Time to Produce"]
      );
    }

    // console.log('item name', item.Name)
  }

  /**
   * Callback function for RecipesTable.onRecipeClick
   * Updates the 'this.items' object in this component's state, which updates the RecipesTable(s)
   * @param {string} itemName The name of the item
   * @param {string} recipeId The id of the recipe selected
   */
  selectRecipe = (itemName, recipeId) => {
    const items = this.items;

    // Step 1: Reset items that were dependent on the previous recipe
    this.startRecursiveReset(items[itemName], items);
    items[itemName].selectRecipe(recipeId);
    // console.log('recipesDashboard.jsx | items after recursive reset', items)

    // Step 2: Find the best way to make money using the new decision
    let optimalActions = this.shoppingCart.optimizer.startCalculatingOptimalActions(
      itemName,
      items,
      recipeId
    );
    console.log("recipesDashboard.jsx | optimalActions", optimalActions);
    let chosenAction = recipeId == null ? "Buy" : "Craft";
    // Step 3: Using the new optimal actions calculated, update the items object so that the corresponding tables are displayed
    this.cascadeActiveRecipeWithOptimalActions(
      optimalActions,
      itemName,
      chosenAction,
      items
    );

    // Step 4: Recalculate all the costs!
    this.recalculate();
  };

  /**
   *
   * @param {obj} overrides
   * {
   *  craftCount: int
   *  valuePackEnabled: true/false
   * }
   */
  recalculate = (overrides) => {
    // Step 1: Calculate the costs associated with the desired action tree. (TODO: Move to separate function?)
    // console.log("THIS PROPS PRODUCT = ", this.props.product, this.items);
    if (overrides != null) {
      this.shoppingCart.calculateCosts(
        this.props.product,
        overrides.craftCount,
        this.items
      );
    } else {
      this.shoppingCart.calculateCosts(
        this.props.product,
        this.state.craftCount,
        this.items
      );
    }

    // Step 2: Finally update the state to see the changes
    this.updateTables();
  };

  /**
   *
   * @param {object} item Instance of the Item object
   * @param {object} items Dictionary of Item objects. This is used to referenced Items used in the recipe
   */
  startRecursiveReset(item, items) {
    console.log("recipesDashboard.jsx | Starting recursive reset:", item);
    const recipeId = item.activeRecipeId;

    if (recipeId == null) return;
    for (let ingredient of item.recipes[recipeId].ingredients) {
      console.log(
        "recipesDashboard.jsx | Ingredient reset:",
        ingredient["Item Name"]
      );
      const ingredientName = ingredient["Item Name"];
      this.recursivelyResetItemUses(items[ingredientName], items);
    }
  }

  /**
   *
   * @param {object} item Instance of the Item object
   * @param {object} items Dictionary of Item objects. This is used to referenced Items used in the recipe
   */
  recursivelyResetItemUses(item, items) {
    // item = {...item}
    const recipeId = item.activeRecipeId;

    if (recipeId != null) {
      for (let ingredient of item.recipes[recipeId].ingredients) {
        const ingredientName = ingredient["Item Name"];
        console.log(
          "recipesDashboard.jsx | Ingredient reset:",
          ingredient["Item Name"]
        );

        this.recursivelyResetItemUses(items[ingredientName], items);
      }
    }
    item.resetUses();
    items[item.name] = item;
  }

  resetToOptimal() {
    // Get optimal action for each recipe of the root product
    const bestRecipeActions = this.shoppingCart.optimizer.findOptimalActionSets(
      this.props.product,
      this.items
    );
    const { product } = this.props;

    // Choose most optimal recipe and the optimal actions for profit
    let bestActionSet = null;
    for (let actionSetIdx in bestRecipeActions) {
      const actionSet = bestRecipeActions[actionSetIdx];
      if (bestActionSet == null) {
        bestActionSet = actionSet;
        continue;
      }

      console.log("TEMP", bestActionSet.optimalActions);
      console.log("TEMP", product);
      console.log("TEMP", bestActionSet.optimalActions[product]);
      const oldCraftAction = bestActionSet.optimalActions[product]["Craft"];
      const newCraftAction = actionSet.optimalActions[product]["Craft"];
      const marketPrice = this.items[product].getMarketPrice();
      if (
        oldCraftAction.calculateProfit(marketPrice) <
        newCraftAction.calculateProfit(marketPrice)
      )
        bestActionSet = actionSet;
    }

    console.log("recipesDashboard.jsx | Best Action Set", bestActionSet);
    this.selectRecipe(
      product,
      bestActionSet["optimalActions"][product]["Craft"].recipe_id
    );
  }

  /**
   * Selects the RecipeTables that should be active by modifying the 'this.items' object
   * @param {object} optimalActions The set of actions determined by the user
   * @param {string} currentItem Name of the item
   * @param {string} actionTaken 'Buy' or 'Craft'
   * @param {object} items  this.items
   */
  cascadeActiveRecipeWithOptimalActions(
    optimalActions,
    currentItem,
    actionTaken,
    items = { ...this.items },
    parent = {}
  ) {
    const { parentRecipeId, parentName } = parent;
    console.log("Optimal Actions", JSON.stringify(optimalActions, null, 4));
    console.log("Active Item:", currentItem);
    console.log("Action Taken:", actionTaken);
    const action = optimalActions[currentItem][actionTaken];
    if (action == null) return items; // Base case. Return when there is no valid action

    items[currentItem].addUse(
      actionTaken,
      parentName,
      parentRecipeId,
      action.recipe_id
    ); // e.g. Item.addUse('Craft', parentRecipeId, action's recipe Id which may be null if Buying)
    if (actionTaken == "Buy") return items;

    // Recursively update activeRecipes dictionary using more calls to cascadeActiveRecipeWithOptimalActions
    for (const ingredientIdx in action.recipe.ingredients) {
      const ingredient = action.recipe.ingredients[ingredientIdx];
      const name = ingredient["Item Name"];
      const ingredientAction = action.actionSequence[ingredientIdx];
      console.log("TEMP", name, ingredientAction);
      const newParent = {
        parentRecipeId: action.recipe_id,
        parentName: currentItem,
      };
      this.cascadeActiveRecipeWithOptimalActions(
        optimalActions,
        name,
        ingredientAction,
        items,
        newParent
      );
    }

    return items;
  }

  updateTables() {
    console.log(this.items);

    // Convert this.items into array
    let recipeTables = Object.values(this.items);
    recipeTables.filter(function (item) {
      return item.usedInRecipes.length > 0 || item.activeRecipeId != null;
    });
    recipeTables.sort(function (a, b) {
      return a.depth - b.depth;
    });

    this.setState({ recipeTables });
  }

  renderTables() {
    if (this.state.recipeTables == null) {
      return (
        <h2 style={{ "text-align": "center" }}>
          Use the search bar to select a recipe
        </h2>
      );
    }

    return (
      <div>
        {this.state.recipeTables.map((item) => {
          return (
            <RecipesTable
              productName={item.name}
              item={item}
              onRecipeClick={this.selectRecipe}
              onBuyClick={(itemName) => this.selectRecipe(itemName, null)}
              detailsShown={this.state.openProfitDetails[item.name]}
              onProfitDetailsButtonPressed={(itemName) => {
                const temp = { ...this.state.openProfitDetails };
                console.log(temp);
                console.log(temp[itemName], itemName);
                temp[itemName] =
                  temp[itemName] == null || temp[itemName] == false
                    ? true
                    : false;
                console.log(temp);
                this.setState({ openProfitDetails: temp });
              }}
            ></RecipesTable>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={8} md={9} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div>{this.renderTables()}</div>;
        </Col>
        <Col xs={4} md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Sticky
            className="mt-4"
            enabled={true}
            top={50}
            bottomBoundary={2000}
          >
            <RecipesSidebar
              recipeTables={this.state.recipeTables}
              onUpdateCraftCount={(newCraftCount) => {
                this.setState({ craftCount: newCraftCount });
                this.recalculate({ craftCount: newCraftCount });
              }}
              onUpdateValuePack={(valuePackEnabled) => {
                ProfitCalculator.valuePackEnabled = valuePackEnabled
                this.resetToOptimal()
              }}
            ></RecipesSidebar>
          </Sticky>
        </Col>
      </Row>
    );
  }
}

export default RecipesDashboard;
