import React, { Component } from "react";

import axios from "axios";
import "../css/RecipeTables.css";
import ShoppingCart from "../helpers/ShoppingCart";
import PPHOptimizer from "../helpers/PPHOptimizer";
import RecipesTable from './recipesTable';

class Item {
  constructor(initialItemData) {
    // console.log("Initial Item Data", initialItemData)
    this.name = initialItemData['Name']
    this.marketData = initialItemData['Market Data']
    this.recipes = {}
    this.usedInRecipes = []
    this.activeRecipeId = null
    this.addRecipe(initialItemData['_id'], initialItemData['Name'], initialItemData['Recipe'], initialItemData['Quantity Produced'], initialItemData['Time to Produce'])
  }

  getMarketPrice() {
    return this.marketData['Market Price']
  }

  addRecipe(_id, productName, recipe, quantityProduced, timeToProduce) {
    if (this.recipes[_id] == null)
      this.recipes[_id] = new Recipe(productName, recipe, 'Buy', quantityProduced, timeToProduce)
    // this.printRecipes()
  }

  /**
   * 
   * @param {string} actionTaken // Craft or Buy 
   * @param {string} parentRecipeId // What recipe is this item used in?
   * @param {string} activeRecipeId // One of the recipes to craft this item
   */
  addUse(actionTaken, parentRecipeId, activeRecipeId) {
    this.usedInRecipes.push({
      actionTaken, 
      parentRecipeId
    })
    this.activeRecipeId = activeRecipeId
  }

  removeUses() {
    this.usedInRecipes = []
    this.activeRecipeId = null
  }

  printRecipes() {
    console.log('Recipes:', this.recipes)
  }
}

class Recipe {
  constructor(productName, ingredients, craftOrBuy = "Buy", quantityProduced = null, timeToProduce = null) {
    this.productName = productName
    this.craftOrBuy = craftOrBuy 
    this.ingredients = ingredients
    this.quantityProduced = quantityProduced
    this.timeToProduce = timeToProduce
  }

  printIngredients() {
    console.log('Ingredients:', this.ingredients)
  }
}

class RecipesDashboard extends Component {
  state = {
    items: null,    
  };

  componentDidMount() {
    this.allOptimalActionSets = null
    this.currentActionSet = null
    this.shoppingCart = new ShoppingCart(new PPHOptimizer());
  }

  async componentDidUpdate(nextProps) {
    const { product: productName } = this.props;
    // Only update if the props changed
    if (nextProps.product != productName) {
      await this.getData(productName)
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
      this.originalRecipesData = recipes
      this.sortRecipes(recipes);
      this.parseRecipes(recipes);
      console.log('Final Items', this.state.items)
    } catch (e) {
      console.log(e);
    }
  }

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
    let items = {};
    console.log("recipes.jsx | Orignal Recipes Data: ", recipes)

    // Parse Recipe and prep for the display in table format
    for (const recipe of recipes) {
      this.addItem(items, recipe);

      for (let ingredient of recipe.Ingredients) {
        this.addItem(items, ingredient);
      }
    }

    // // Get optimal actions
    this.allOptimalActionSets = this.shoppingCart.optimizer.findOptimalActionSets(this.props.product, items);
    
    this.setState({items})
    this.resetToOptimal()
    return items
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
      items[item.Name].addRecipe(item['_id'], item['Name'], item.Recipe, item['Quantity Produced'], item['Time to Produce']);
    }

    // console.log('item name', item.Name)
  }

  /**
   * Callback function for RecipesTable.onRecipeClick
   * Updates the 'this.items' object in this component's state, which updates the RecipesTable(s)
   * @param {string} itemName 
   * @param {int} recipeIdx 
   */
  selectRecipe(itemName, recipeIdx) {
    
    // If the root recipe was selected, change out the current action set
    if (itemName == this.props.product) {
      // Select Recipe
      this.currentActionSet = this.allOptimalActionSets[recipeIdx]

      // Calcualte costs
      // const {recipeIdx: rootRecipeIdx} = this.currentActionSet
      // const shoppingCartData = this.shoppingCart.setRootItem(this.originalRecipesData[rootRecipeIdx], 5);
      // console.log('Shopping Cart Data', shoppingCartData);
    } else {
      // Select Recipe
      // this.currentActionSet.optimalActions[itemName]...['Craft'].recipe /// update recipe

      // Calcualte costs
      // const {recipeIdx: rootRecipeIdx} = this.currentActionSet
      // const shoppingCartData = this.shoppingCart.calculateCostsWithActionSet(this.currentActionSet, this.originalRecipesData[rootRecipeIdx], 5);
      // console.log('Shopping Cart Data 2', shoppingCartData);

    }
    // Re-calculate the path to the recipe

    // Update active recipes
    const items = this.cascadeActiveRecipe(
      this.currentActionSet.optimalActions,
      this.props.product,
      "Craft"
    );

    this.setState({items})
    
  }

  selectCraftOrBuy(itemName, craftOrBuy) {
    
  }

  resetToOptimal(items = this.state.items) {
    // TODO: Move to separate method?
    // Get optimal action for each recipe of the root product
    const bestRecipeActions = this.allOptimalActionSets
    const {product} = this.props
    // Choose most optimal recipe and the optimal actions for profit
    let bestActionSet = null
    for (var actionSetIdx in bestRecipeActions) {
      const actionSet = bestRecipeActions[actionSetIdx]
      if (bestActionSet == null) { bestActionSet = actionSet; continue; } 

      const oldCraftAction = bestActionSet.optimalActions[product]['Craft']
      const newCraftAction = actionSet.optimalActions[product]['Craft']
      const marketPrice = items[product].getMarketPrice()
      if (oldCraftAction.calculateProfit(marketPrice) < newCraftAction.calculateProfit(marketPrice))
        bestActionSet = actionSet
    }

    this.selectRecipe(product, actionSetIdx)
  }

  
  /**
 * Selects the RecipeTables that should be active by modifying the 'this.state.items' object
 * @param {object} optimalActions The set of actions determined by the user
 * @param {string} currentItem Name of the item
 * @param {string} actionTaken 'Buy' or 'Craft'
 * @param {object} items  this.state.items
 */
  cascadeActiveRecipe(optimalActions, currentItem, actionTaken, parentRecipeId = null, items = {...this.state.items}) {
    const action = optimalActions[currentItem][actionTaken];
    if (action == null) return; // Base case. Return when there is no valid action
    // if (actionTaken == "Buy") {
    items[currentItem].addUse(actionTaken, parentRecipeId, action.recipe_id) // e.g. Item.addUse('Craft',)
    // }

    if (actionTaken == "Buy") return;

    // Update the activeRecipes dictionary
    // for (const [_id, recipe] of Object.entries(items[currentItem].recipes)) {
    //   console.log('ID/RECIPE',_id, recipe);
      
    //   // if (recipe == )
    // }

    // OLD
    // for (const recipeIdx in items[currentItem]) {
    //   const recipe = items[currentItem][recipeIdx];
    //   if (recipe == action.recipe["Ingredients"]) {
    //     activeRecipes[currentItem] = {
    //       recipeIdx,
    //       craftOrBuy: actionTaken,
    //     };
    //   }
    // }

    // Recursively update activeRecipes dictionary using more calls to cascadeActiveRecipe
    for (const ingredient of action.recipe.ingredients) {
      const name = ingredient["Item Name"];
      const ingredientAction = ingredient["Action"];
      this.cascadeActiveRecipe(
        optimalActions,
        name,
        ingredientAction,
        action.recipe_id,
        items
      );
    }

    return items
  }

  renderTables() {
    if (this.state.items == null) {
      return (
        <h2 style={{ "text-align": "center" }}>
          Use the search bar to select a recipe
        </h2>
      );
    }
    return (
      <div>
        {Object.keys(this.state.items).map((productName, index) => {
          const item = this.state.items[productName]
          return (
            <>
              {item.activeRecipeId != null ? (
                <RecipesTable productName={productName} item={item} onRecipeClick={()=>console.log("On Recipe Click")} onCraftOrBuyClick={()=>console.log("On Craft or Buy Click")}></RecipesTable>
              ) : null}
            </>
          );
        })}

      </div>
    );
  }

  render() {
    return <div>{this.renderTables()}</div>;
  }
}

export default RecipesDashboard;
