class ShoppingCart {

  /**
   * 
   * @param {object} optimizer Instance of PPHOptimizer
   */
  constructor(optimizer) {
    this.cart = []
    this.optimizer = optimizer
  }

  clearCart() {
    this.cart = []
  }


  calculateCosts(itemName, quantity = 1, items) {
    this.clearCart()
    for (const [key, _] of Object.entries(items)) {
      items[key]['shoppingCartData'] = []
    }

    this.addItem(itemName, quantity, items[itemName].activeRecipeId, null, items)
  }

  /**
   * Adds item to cart if it doesn't exist
   * @param {object} item Instance of Item
   * @param {int} quantity The number 
   * @param {string} action Either Craft or Buy. Craft by default
   */
  addItem(itemName, quantity = 1, selectedRecipeId, parentName = null, items) {
    // Retrieve the recipe from the optimalActions variable in the optimizer
    console.log('ShoppingCart.js | item name', itemName, items)
    const item = items[itemName]
    const recipe = item.recipes[selectedRecipeId]
    const action = selectedRecipeId == null ? 'Buy' : 'Craft'

    // Calculate how many times the player must 'craft' the item
    let craftCount = quantity
    if (action == "Craft") {
      craftCount = Math.ceil(quantity / recipe.quantityProduced)
    }

    // Add the ingredients of the recipe to the cart as well if the item is being crafted
    let recipePrice = 0
    let cumulativeTimeSpent = 0
    if (action == "Craft") {
      for (let ingredient of recipe.ingredients) {
        const ingredientQuantity = ingredient['Amount'] * craftCount
        const ingredientName = ingredient['Item Name']
        const {recipePrice: price, cumulativeTimeSpent: timeSpentToCraftIngredient} = this.addItem(ingredientName, ingredientQuantity, items[ingredientName].activeRecipeId, itemName, items)
        recipePrice += price * ingredient['Amount']
        cumulativeTimeSpent += timeSpentToCraftIngredient * ingredient['Amount']
      }
      cumulativeTimeSpent += recipe.timeToProduce
      cumulativeTimeSpent /= recipe.quantityProduced
      recipePrice /= recipe.quantityProduced
    } else {
      recipePrice = item.getMarketPrice()
    }

    const shoppingCartData = {
      // name: itemName,
      // action: action,
      // recipe: recipe != null ? recipe.ingredients : null, 
      craftCount: craftCount,
      expectedCount: action == "Craft" ? recipe.quantityProduced * craftCount : craftCount, // Store the total amount that is expected to be crafted
      individualPrice: recipePrice,
      cumulativeTimeSpent: cumulativeTimeSpent,
      for: parentName 
      // marketData: marketData
    }
    this.cart.push(shoppingCartData) 
    items[itemName]['shoppingCartData'].push(shoppingCartData)

    return {currentCart: this.cart, recipePrice, cumulativeTimeSpent}
  }

  printShoppingCart() {
    console.log(JSON.stringify(this.cart, null, 4))
  }

  getPriceForRecipe(item, recipeId, items) {
    const recipe = item.recipes[recipeId]
    if (recipeId == null) return item.getMarketPrice()
  
    let totalCost = 0
    for (const ingredient of recipe.ingredients) {
      const ingredientName = ingredient['Item Name']
      totalCost += this.getPriceForRecipe(items[ingredientName], items[ingredientName].activeRecipeId, items)
    }
  
    return totalCost
  }
}



export default ShoppingCart