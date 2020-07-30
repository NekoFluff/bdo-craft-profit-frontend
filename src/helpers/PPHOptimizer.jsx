let sample = {
  "_id": "5f1a1a47f99c32cda3f4e998",
  "Action": "Cooking",
  "Is Symbolic": true,
  "Name": "Dough",
  "Quantity Produced": 2.5,
  "Time to Produce": 0,
  "Recipe": [
      {
          "Item Name": "Wheat Dough",
          "Amount": 1
      }
  ],
  "Market Data": {
      "_id": "5f15dac7cea9de4bcc529788",
      "Last Update Attempt": "2020-03-25 18:16:37.849883",
      "Last Updated": "2020-03-25 18:16:37.849883",
      "Market Price": 132,
      "Name": "Dough"
  },
  "Ingredients": [
      {
          "_id": "5f1a1a47f99c32cda3f4ea28",
          "Action": "Shaking          ",
          "Name": "Wheat Dough",
          "Quantity Produced": 2.5,
          "Time to Produce": 6,
          "Recipe": [
              {
                  "Item Name": "Mineral Water",
                  "Amount": 1
              },
              {
                  "Item Name": "Wheat Flour",
                  "Amount": 1
              }
          ],
          "Market Data": {
              "_id": "5f15dac7cea9de4bcc529817",
              "ID": 7201,
              "Last Update Attempt": "2020-03-25 18:12:28.759706",
              "Last Updated": "2020-03-25 18:12:28.759706",
              "Market Price": 1490,
              "Name": "Wheat Dough",
              "Quantity": 29421,
              "Total Trade Count": 112885498
          },
          "depth": 0
      },
      {
          "_id": "5f1a1a47f99c32cda3f4ea27",
          "Name": "Wheat",
          "Recipe": null,
          "Market Data": {
              "_id": "5f15dac7cea9de4bcc529816",
              "Last Update Attempt": "2020-03-25 18:12:34.580134",
              "Last Updated": "2020-03-04 15:27:48.801578",
              "Market Price": 750,
              "Name": "Wheat"
          },
          "depth": 2
      },
      {
          "_id": "5f1a1a47f99c32cda3f4e9d0",
          "Name": "Mineral Water",
          "Recipe": null,
          "Market Data": {
              "_id": "5f15dac7cea9de4bcc5297c0",
              "Last Update Attempt": "2020-03-25 18:12:34.573152",
              "Last Updated": "2020-03-25 18:12:34.573152",
              "Market Price": 30,
              "Name": "Mineral Water"
          },
          "depth": 1
      },
      {
          "_id": "5f1a1a47f99c32cda3f4ea29",
          "Action": "Grinding",
          "Name": "Wheat Flour",
          "Quantity Produced": 2.5,
          "Time to Produce": 6,
          "Recipe": [
              {
                  "Item Name": "Wheat",
                  "Amount": 1
              }
          ],
          "Market Data": {
              "_id": "5f15dac7cea9de4bcc529818",
              "ID": 7101,
              "Last Update Attempt": "2020-03-25 18:12:31.084649",
              "Last Updated": "2020-03-25 18:12:31.084649",
              "Market Price": 1270,
              "Name": "Wheat Flour",
              "Quantity": 123391,
              "Total Trade Count": 252390625
          },
          "depth": 1
      },
      {
          "_id": "5f221e6049123c172883a855",
          "Action": "Delete Me",
          "Name": "Wheat",
          "Quantity Produced": 2.5,
          "Time to Produce": 6,
          "Recipe": null,
          "Market Data": {
              "_id": "5f15dac7cea9de4bcc529816",
              "Last Update Attempt": "2020-03-25 18:12:34.580134",
              "Last Updated": "2020-03-04 15:27:48.801578",
              "Market Price": 750,
              "Name": "Wheat"
          },
          "depth": 2
      }
  ]
}

sample = {
  "_id": "5f1a1a47f99c32cda3f4e974",
  "Action": "Chopping",
  "Name": "Acacia Plywood",
  "Quantity Produced": 2.5,
  "Time to Produce": 6,
  "Recipe": [
      {
          "Item Name": "Acacia Plank",
          "Amount": 10
      }
  ],
  "Market Data": {
      "_id": "5f15dac7cea9de4bcc529762",
      "ID": 4681,
      "Last Update Attempt": "2020-03-25 18:12:18.801806",
      "Last Updated": "2020-03-25 18:12:18.801806",
      "Market Price": 15300,
      "Name": "Acacia Plywood",
      "Quantity": 5717,
      "Total Trade Count": 45315927
  },
  "Ingredients": [
      {
          "_id": "5f1a1a47f99c32cda3f4e973",
          "Action": "Chopping",
          "Name": "Acacia Plank",
          "Quantity Produced": 2.5,
          "Time to Produce": 6,
          "Recipe": [
              {
                  "Item Name": "Acacia Timber",
                  "Amount": 5
              }
          ],
          "Market Data": {
              "_id": "5f15dac7cea9de4bcc529761",
              "ID": 4680,
              "Last Update Attempt": "2020-03-25 18:12:16.648140",
              "Last Updated": "2020-03-25 18:12:16.648140",
              "Market Price": 3670,
              "Name": "Acacia Plank",
              "Quantity": 1942,
              "Total Trade Count": 35638445
          },
          "depth": 0
      },
      {
          "_id": "5f1a1a47f99c32cda3f4e975",
          "Action": "Gathering",
          "Name": "Acacia Timber",
          "Recipe": null,
          "Market Data": {
              "_id": "5f15dac7cea9de4bcc529763",
              "ID": 4609,
              "Last Update Attempt": "2020-03-25 18:12:17.766127",
              "Last Updated": "2020-03-25 18:12:17.766127",
              "Market Price": 1670,
              "Name": "Acacia Timber",
              "Quantity": 0,
              "Total Trade Count": 204655455
          },
          "depth": 1
      }
  ]
}


class ItemHierarchyManager {

  constructor(recipe) {
    this.optimalActions = {}

    // Sort ingredients
    recipe.Ingredients = recipe.Ingredients.sort(function(a,b) {return b['Market Data']['Market Price']-a['Market Data']['Market Price']})
    
    // Create Items
    this.items = {}
    this.items[recipe.Name] = new Item(recipe)

    for (let i of recipe.Ingredients) {
      if (this.items[i.Name] == null)
        this.items[i.Name] = new Item(i)
      else
        this.items[i.Name].addRecipe(i)
    }

    // console.log('Hierarchy View of Recipe:', JSON.stringify(this.items, null, 4))
    this.calculateOptimalActions(this.items[recipe.Name])
    
    console.log(JSON.stringify(this.optimalActions, null, 4))
  }

  * sequenceGenerator(n, arr, i) {
      if (i == n) {
        yield arr
        return
      }

      arr[i] = 'Buy'
      yield* this.sequenceGenerator(n, arr, i+1)      

      arr[i] = 'Craft'
      yield* this.sequenceGenerator(n, arr, i+1)
   }

  calculateOptimalActions(item) {
    // If the calculations were already performed, just return those.
    if (this.optimalActions[item.Name] != null) return this.optimalActions[item.Name]

    // What is the cost to buy this item?
    const itemMarketPrice = item.getMarketPrice()
    if (this.optimalActions[item.Name] == null) {
      this.optimalActions[item.Name] = {}
      this.optimalActions[item.Name]['Buy'] = new Action(itemMarketPrice, 0, null, null, "Buy")
    }

    let possibleCraftOptions = []
    // For every possible recipe that can be crafted...
    for (let possibleRecipe of item.recipes) {

      // Skip to next recipe if there is no crafting option
      if (possibleRecipe['Ingredients'] == null) continue;

      // Generate all possible sequences of 'Buy' or 'Craft' for the list of ingredients
      let arr = []
      for (let i = 0; i < possibleRecipe["Ingredients"].length; i++) { arr.push("Buy") }
      const gen = this.sequenceGenerator(arr.length, arr, 0) // Sample sequence: ['Buy', 'Sell', 'Buy']
      let generatorResult = gen.next()
      while (generatorResult.done == false) {
        let sequence = generatorResult.value
        let totalCost = 0
        let totalTime = 0
        let sequenceImpossible = false;

        for (let i = 0; i < sequence.length; i++) {
          // Buy or craft the ingredient?
          const buyOrCraft = sequence[i]
          const ingredient = possibleRecipe["Ingredients"][i] // The string
          const ingredientItem = this.items[ingredient['Item Name']] // The object
          const action = this.calculateOptimalActions(ingredientItem)[buyOrCraft]
          
          // The provided sequence is impossible. (Cannot craft the ingredient!)
          if (action == null) {
            sequenceImpossible = true;
            break;
          }

          // For this 'possible recipe' what is the cost to craft it?
          // (using optimal action)
          if (buyOrCraft == "Buy") {
            totalCost += ingredient['Amount'] * action.monetaryCost
          } else {
            // Some items used to produce this ingredent may have been bought while others were crafted
            totalTime += ingredient['Amount'] * action.time 
            totalCost += ingredient['Amount'] * action.monetaryCost 
          } 
          
        }
        
        if (!sequenceImpossible) { // The sequence was valid!
          possibleCraftOptions.push(new Action(totalCost / possibleRecipe['Quantity Produced'], 
                                               (totalTime + possibleRecipe['Time to Produce']) / possibleRecipe['Quantity Produced'], 
                                               possibleRecipe, 
                                               [...sequence], 
                                               "Craft"))

        }

        // Pick next sequence to test...
        generatorResult = gen.next()
      }
    }

    // Finally choose the best possible crafting action
    let bestAction = null;
    let bestProfitValue = null;
    for (const action of possibleCraftOptions) {
      if (bestAction == null) {
        bestAction = action;
        bestProfitValue = action.calculateProfit(itemMarketPrice)
        continue;
      }

      const profit = action.calculateProfit(itemMarketPrice)
      if (profit > bestProfitValue) {
        bestAction = action
      }
    }

    this.optimalActions[item.Name]['Craft'] = bestAction

    return this.optimalActions[item.Name]
  }
}

class Action {
  constructor(monetaryCost = 0, time = 0, recipe = null, sequence = null, action = "Buy") {
    this.action = action
    this.monetaryCost = monetaryCost
    this.time = time
    this.recipe = recipe

    for (let idx in sequence) {
      this.recipe['Ingredients'][idx]['Action'] = sequence[idx]
    }
  }

  calculateProfit(sellPrice) {
    const TAX_PERCENTAGE = 0.65;

    // Measure the profit for each action
    return ((sellPrice * TAX_PERCENTAGE) - this.monetaryCost) / this.time
  }
}

class Item {

  constructor(item) {
    this.recipes = []
    this.addRecipe(item)
    this.marketData = item['Market Data']
    this.Name = item['Name']
  }

  addRecipe(item) {
    this.recipes.push({
      "Quantity Produced": item['Quantity Produced'],
      "Time to Produce": item["Time to Produce"],
      "Ingredients": item["Recipe"]
    })
  }

  getMarketPrice() {
    return this.marketData['Market Price']
  }

}

new ItemHierarchyManager(sample)