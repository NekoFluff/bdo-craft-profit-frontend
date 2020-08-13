import React, { Component } from "react";

import axios from "axios";
import ShoppingCart from "../helpers/ShoppingCart";
import PPSOptimizer from "../helpers/PPSOptimizer";
import RecipesTable from "./recipesTable";
import { Events, scrollSpy } from "react-scroll";
import { Row, Col } from "react-bootstrap";
import RecipesSidebar from "../components/recipesSidebar";
import Sticky from "react-stickynode";
import ProfitCalculator from "./../helpers/ShoppingCartProfitCalculator";
import { API_ENDPOINT } from "../helpers/CONSTANTS";

class Item {
  /**
   * Create a new Item object
   * @param {object} initialItemData e.g {Action: string, Ingredients: [], Market Data: {}, Name: string, Quantity Produced: float, Recipe: [], Time to Produce: float}
   */
  constructor(initialItemData) {
    // console.log("Initial Item Data", initialItemData)
    this.name = initialItemData["Name"];
    this.marketData = initialItemData["Market Data"];
    this.shoppingCartData = {}
    this.recipes = {};
    this.usedInRecipes = {};
    this.activeRecipeId = null;
    this.depth = initialItemData["depth"] || -1;
    this.overrideMarketPrice = null;
    this.isSymbolic = false // A symbolic recipe is not meant to be bought
    this.addRecipe(
      initialItemData["_id"],
      initialItemData["Name"],
      initialItemData["Recipe"],
      initialItemData["Quantity Produced"],
      initialItemData["Time to Produce"],
      initialItemData["Action"]
    );
  }

  getMarketPrice() {
    return this.overrideMarketPrice || (this.marketData && this.marketData["Market Price"]) || 0;
  }

  addRecipe(_id, productName, recipe, quantityProduced, timeToProduce, action) {
    if (this.recipes[_id] == null) {
      this.recipes[_id] = new Recipe(
        productName,
        recipe,
        quantityProduced,
        timeToProduce,
        action
      );

      if (action == 'Symbolic') {
        this.isSymbolic = true
      }
    }

    // this.printRecipes()
  }

  /**
   *
   * @param {string} actionTaken // Craft or Buy
   * @param {string} parentName // What recipe is this item used in?
   * @param {string} parentRecipeId // What recipe is this item used in?
   * @param {string} activeRecipeId // One of the recipes to craft this item
   * @param {string} recipePath // One of the recipes to craft this item
   */
  addUse(actionTaken, parentName, parentRecipeId, activeRecipeId, recipePath) {
    this.usedInRecipes[recipePath] = ({
      actionTaken,
      parentName,
      parentRecipeId
    });

    if (this.activeRecipeId == null) this.selectRecipe(activeRecipeId);
    else if (activeRecipeId != this.activeRecipeId) {
      console.log(
        "POSSIBLE ERROR: Recursive recipe OR recipe needs to be bought/crafted at the same time... or crafted using multiple recipes. \nItem name:",
        this.name,
        '\nActive recipe:', this.activeRecipeId,
        '\nTarget recipe:', activeRecipeId
      );
    }
  }

  addShoppingCartData(recipePath, data) {
    this.shoppingCartData[recipePath] = data
  }

  getShoppingCartData(recipePath) {
    return this.shoppingCartData[recipePath]
  }

  selectRecipe(recipeId) {
    this.activeRecipeId = recipeId;
  }

  resetUses = (recipePath) => {
    if (recipePath == null) {
      this.usedInRecipes = {};
    } else {
      delete this.usedInRecipes[recipePath]
      delete this.shoppingCartData[recipePath]
    }

    console.log("Reset Use: ", this.name, 'Recipe Path:', recipePath, 'Used in Recipes:', JSON.stringify(this.usedInRecipes, null, 4), JSON.stringify(this.shoppingCartData, null, 4))
    if (Object.keys(this.usedInRecipes).length == 0)
      this.activeRecipeId = null;
  };

  setDepth(depth) {
    if (this.depth == -1 || depth < this.depth) {
      this.depth = depth
    }
  }

  printRecipes() {
    console.log("Recipes:", this.recipes);
  }
}

class Recipe {
  constructor(
    productName,
    ingredients,
    quantityProduced = null,
    timeToProduce = null,
    action = null
  ) {
    this.productName = productName;
    this.ingredients = ingredients;
    this.quantityProduced = quantityProduced;
    this.timeToProduce = timeToProduce;
    this.action = action
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
    this.shoppingCart = new ShoppingCart(new PPSOptimizer());

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
      const { data: recipes } = await axios.get(
        API_ENDPOINT + "/recipes?item=" + productName
      );
      this.originalRecipesData = recipes;
      // this.sortRecipes(recipes);
      if (recipes.length > 0) {
        this.officialProductName = recipes[0]['Name']
      } else {
        this.officialProductName = null
      }
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
    if (recipes.length <= 1) return recipes;
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
        item["Time to Produce"],
        item["Action"]
      );
      items[item.Name].setDepth(item['depth'])
    }

    // console.log('item name', item.Name)
  }

  resetRecipePath = (itemName, recipePath) => {
    const items = this.items;
    // Step 0: Parse path variables
    let pathArr = recipePath.split('/')
    let parentName = pathArr.length >= 2  ? pathArr[pathArr.length - 2] : null
    if (parentName == "") parentName = null
    let parentPath = pathArr.slice(0, -1).join('/')
    if (parentPath == "") parentPath = null
    console.log('Reset', pathArr, parentName, parentPath)
    // let parentRecipeId = this.items[parentName] != null ? this.items[parentName].activeRecipeId : null


    // Step 1: Reset items that were dependent on the previous recipe
    // for (let [parentPath, val] of Object.entries(items[itemName].usedInRecipes)) {
    //   this.startRecursiveReset(items[itemName], items, parentPath);
    // }
    this.startRecursiveReset(items[itemName], items, parentPath);
  }

  /**
   * Callback function for RecipesTable.onRecipeClick
   * Updates the 'this.items' object in this component's state, which updates the RecipesTable(s)
   * @param {string} itemName The name of the item
   * @param {string} recipeId The id of the recipe selected
   */
  selectRecipe = (itemName, recipeId, recipePath) => {
    const items = this.items;
    // Step 0: Parse path variables
    let pathArr = recipePath.split('/')
    let parentName = pathArr.length >= 2  ? pathArr[pathArr.length - 2] : null
    if (parentName == "") parentName = null
    let parentPath = pathArr.slice(0, -1).join('/')
    if (parentPath == "") parentPath = null
    console.log('Select', pathArr, parentName, parentPath)
    let parentRecipeId = this.items[parentName] != null ? this.items[parentName].activeRecipeId : null

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
      items,
      {
        parentRecipeId: parentRecipeId,
        parentName: parentName,
        parentPath: parentPath,
      }
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
    // console.log("THIS PROPS PRODUCT = ", this.officialProductName, this.items);
    if (overrides != null) {
      this.shoppingCart.calculateCosts(
        this.officialProductName,
        overrides.craftCount,
        this.items
      );
    } else {
      this.shoppingCart.calculateCosts(
        this.officialProductName,
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
  startRecursiveReset(item, items, parentPath) {
    this.alreadyResetPath = {}
    // if (parentPath != null) {
    //   const everythingButLast = parentPath.split('/').slice(0, -1).join('/')
    //   const lastObject = parentPath.split('/').slice(-1)[0]
    //   console.log("recipesDashboard.jsx | Starting recursive reset:", parentPath, item, everythingButLast, lastObject);
    //   if (lastObject == item.name) {
    //     return this.recursivelyResetItemUses(item, items, everythingButLast);
    //   }
    // }
    console.log("recipesDashboard.jsx | Starting recursive reset:", parentPath, item);

    return this.recursivelyResetItemUses(item, items, parentPath);
    

    // const recipeId = item.activeRecipeId;

    // if (recipeId == null) return;
    // let currentPath = `/${item.name}`
    // for (let ingredient of item.recipes[recipeId].ingredients) {
    //   console.log(
    //     "recipesDashboard.jsx | Ingredient reset:",
    //     ingredient["Item Name"]
    //   );
    //   const ingredientName = ingredient["Item Name"];
    //   this.recursivelyResetItemUses(items[ingredientName], items, currentPath);
    // }
  }

  /**
   *
   * @param {object} item Instance of the Item object
   * @param {object} items Dictionary of Item objects. This is used to referenced Items used in the recipe
   */
  recursivelyResetItemUses(item, items, parentPath = null) {
    const recipeId = item.activeRecipeId;
    const currentPath = `${parentPath || ''}/${item.name}`
    if (this.alreadyResetPath[currentPath]) {
      console.log('Already reset', item.name); 
      return;
    }
    if (item.usedInRecipes[currentPath] == null) {
      console.log('Reset... No data', item.name, currentPath, JSON.stringify(item.usedInRecipes,null, 4)); 
      return;
    }
    this.alreadyResetPath[currentPath] = true

    if (recipeId != null) {
      for (let ingredient of item.recipes[recipeId].ingredients) {
        const ingredientName = ingredient["Item Name"];
        console.log(
          "recipesDashboard.jsx | Ingredient reset:",
          ingredient["Item Name"], parentPath
        );
        const newPath = `${currentPath || ''}/${ingredientName}`

        this.recursivelyResetItemUses(items[ingredientName], items, currentPath);
      }
    }
    // items[ingredientName].resetUses(newPath);

    item.resetUses(currentPath)
    items[item.name] = item;
  }

  resetToOptimal() {
    console.log("OFFICIAL PRODUCT NAME:", this.officialProductName)

    if (this.officialProductName == null) {
      this.updateTables(); 
      return;
    }

    // Get optimal action for each recipe of the root product
    const bestRecipeActions = this.shoppingCart.optimizer.findOptimalActionSets(
      this.officialProductName,
      this.items
    );
    const product = this.officialProductName;
    // Choose most optimal recipe and the optimal actions for profit
    let bestActionSet = null;
    for (let actionSetIdx in bestRecipeActions) {
      const actionSet = bestRecipeActions[actionSetIdx];
      if (bestActionSet == null) {
        bestActionSet = actionSet;
        continue;
      }

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
    let craftAction = bestActionSet["optimalActions"][product]["Craft"]
    if (craftAction != null) {
      this.selectRecipe(
        product,
        craftAction.recipe_id,
        `/${product}`
      );
    } else {
      this.selectRecipe(
        product,
        bestActionSet["optimalActions"][product]["Buy"].recipe_id,
        `/${product}`
      );
    }

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
    const { parentRecipeId, parentName, parentPath } = parent;
    // console.log("Optimal Actions", JSON.stringify(optimalActions, null, 4));
    // console.log("Active Item:", currentItem);
    // console.log("Action Taken:", actionTaken);
    const action = optimalActions[currentItem][actionTaken];
    if (action == null) return items; // Base case. Return when there is no valid action

    const currentPath = `${parentPath || ''}/${currentItem}`
    const recipePathArr = currentPath.split('/')
    const containsLoop = new Set(recipePathArr).size !== recipePathArr.length
    if (containsLoop) {
      actionTaken = 'Buy'
    }

    if (items[currentItem] != null) {
      items[currentItem].addUse(
        actionTaken,
        parentName,
        parentRecipeId,
        action.recipe_id,
        currentPath
      ); // e.g. Item.addUse('Craft', parentRecipeId, action's recipe Id which may be null if Buying)
    } else {
      console.log(`ERROR: '${currentItem}' does not have a recipe entry in the database. Request a FIX by sending a DM on discord to @Kitsune#1040`)
    }

    if (actionTaken === "Buy") return items;

    // Recursively update activeRecipes dictionary using more calls to cascadeActiveRecipeWithOptimalActions
    for (const ingredientIdx in action.recipe.ingredients) {
      const ingredient = action.recipe.ingredients[ingredientIdx];
      const name = ingredient["Item Name"];
      const ingredientAction = action.actionSequence[ingredientIdx];
      const newParent = {
        parentRecipeId: action.recipe_id,
        parentName: currentItem,
        parentPath: currentPath,
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
    console.log("Update Tables using data... | (this.items): ", this.items);

    // Convert this.items into array
    let recipeTables = Object.values(this.items);
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
    if (this.state.recipeTables == null) {
      if (this.officialProductName == null) {
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
        {this.officialProductName && this.state.recipeTables.map((item, index) => {
          return (
            <RecipesTable
              key={`${item.name}`}
              productName={item.name}
              item={item}
              onRecipeClick={(itemName, recipeId, recipePaths) => {
                for (const path of recipePaths) {
                  this.resetRecipePath(itemName, path)
                }
                for (const path of recipePaths) {
                  this.selectRecipe(itemName, recipeId, path)
                }
              }}
              onBuyClick={(itemName, recipePaths) => {
                for (const path of recipePaths) {
                  this.resetRecipePath(itemName, path)
                }
                for (const path of recipePaths) {
                  this.selectRecipe(itemName, null, path)
                }
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
                return this.items[itemName].marketData != null || this.items[itemName].isSymbolic
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
                this.recalculate({ craftCount: newCraftCount });
              }}
              onUpdateValuePack={(valuePackEnabled) => {
                ProfitCalculator.valuePackEnabled = valuePackEnabled;
                this.resetToOptimal();
              }}
              onMarketPriceChange={(newMarketPrice) => {
                this.items[this.officialProductName][
                  "overrideMarketPrice"
                ] = newMarketPrice;
                this.resetToOptimal();
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
