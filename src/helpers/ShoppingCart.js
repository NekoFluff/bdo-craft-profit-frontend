
let sample = {
  "Acacia Plywood": {
      "Buy": {
          "action": "Buy",
          "monetaryCost": 15300,
          "time": 0,
          "recipe": null
      },
      "Craft": {
          "action": "Craft",
          "monetaryCost": 13360,
          "time": 12,
          "recipe": {
              "Quantity Produced": 2.5,
              "Time to Produce": 6,
              "Ingredients": [
                  {
                      "Item Name": "Acacia Plank",
                      "Amount": 10,
                      "Action": "Craft"
                  }
              ]
          }
      }
  },
  "Acacia Plank": {
      "Buy": {
          "action": "Buy",
          "monetaryCost": 3670,
          "time": 0,
          "recipe": null
      },
      "Craft": {
          "action": "Craft",
          "monetaryCost": 3340,
          "time": 2.4,
          "recipe": {
              "Quantity Produced": 2.5,
              "Time to Produce": 6,
              "Ingredients": [
                  {
                      "Item Name": "Acacia Timber",
                      "Amount": 5,
                      "Action": "Buy"
                  }
              ]
          }
      }
  },
  "Acacia Timber": {
      "Buy": {
          "action": "Buy",
          "monetaryCost": 1670,
          "time": 0,
          "recipe": null
      },
      "Craft": null
  }
}

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

  setRootItem(item, quantity = 1, action="Craft") {
    this.clearCart()
    this.optimizer.setRootItem(item)

    return this.addItem(item.Name, quantity, action)
  }

  calculateCostsWithActionSet(actionSet, item, quantity = 1, action="Craft") {
    this.clearCart()

    return this.addItem(item.Name, quantity, action, actionSet.optimalActions)
  }

  /**
   * Adds item to cart if it doesn't exist
   * @param {object} item Instance of Item
   * @param {int} quantity The number 
   * @param {string} action Either Craft or Buy. Craft by default
   */
  addItem(itemName, quantity = 1, action="Craft", optimalActions = this.optimizer.optimalActions) {
    // Retrieve the recipe from the optimalActions variable in the optimizer
    // const actionObject = sample[itemName][action]
    let actionObject = optimalActions[itemName][action]
    if (actionObject == null && action == "Craft") {
      action = "Buy"
      actionObject = optimalActions[itemName][action]
    }
    const recipe = actionObject.recipe


    // Calculate how many times the player must 'craft' the item
    let craftCount = quantity
    if (action == "Craft") {
      craftCount = Math.ceil(quantity / recipe['Quantity Produced'])
    }
    this.cart.push({
      name: itemName,
      action: action,
      recipe: recipe != null ? recipe['Ingredients'] : null, 
      expectedCount: action == "Craft" ? recipe['Quantity Produced'] * craftCount : craftCount, // Store the total amount that is expected to be crafted
      runningIndiviaulCost: actionObject.monetaryCost,
      runningIndiviaulTime: actionObject.time,
      runningTotalCost: actionObject.monetaryCost * craftCount,
      runningTotalTime: actionObject.time * craftCount,
    }) 

    // Add the ingredients of the recipe to the cart as well if the item is being crafted
    if (action == "Craft") {
      for (let ingredient of recipe['Ingredients']) {
        const ingredientQuantity = ingredient['Amount'] * craftCount
        this.addItem(ingredient['Item Name'], ingredientQuantity, ingredient['Action'])
      }
    }

    return this.cart
  }

  printShoppingCart() {
    console.log(JSON.stringify(this.cart, null, 4))
  }
}

export default ShoppingCart

// const sc = new ShoppingCart(null)
// sc.addItem('Acacia Plywood', 100)
// sc.printShoppingCart()