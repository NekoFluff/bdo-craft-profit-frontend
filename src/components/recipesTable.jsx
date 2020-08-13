import React, { Component } from "react";
import MaterialTable, { MTableToolbar } from "material-table"; // https://material-table.com/#/
import tableIcons from "../helpers/tableIcons";
import { Chip } from "@material-ui/core";
import "../css/RecipeTable.css";
import {
  Link,
  Element,
} from "react-scroll";
import { Button, Badge, Accordion, Card } from "react-bootstrap";
import ProfitCalculator from './../helpers/ShoppingCartProfitCalculator';
import numberWithCommas from './../helpers/numberWithCommas';

class RecipesTable extends Component {
  state = {};

  renderDetailsButton() {
    if (this.props.item.isSymbolic) return null
    let active = this.props.detailsShown ? "0" : null
    return (
      <Accordion defaultActiveKey={active}>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} onClick={(e)=>{this.props.onProfitDetailsButtonPressed(this.props.item.name)}} variant="link" eventKey="0">
              {active ? 'Hide Profit Details' : 'Show Profit Details'}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{this.renderBadges()}</Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card> */}
      </Accordion>
    );
  }

  renderBadges() {
    // const { shoppingCartData, marketData, valuePackEnabled } = this.props.item;
    // if (this.props.item.shoppingCartData.length == null || this.props.item.shoppingCartData.length == 0) return <h2>No shopping cart data available</h2>
    const marketPrice = this.props.item.getMarketPrice();
    let buyCount = 0
    let craftCount = 0
    const firstKey = [0]
    if (firstKey == null) return

    let individualPrice = -1
    let cumulativeTimeSpent = -1
    for (const [key, val] of Object.entries(this.props.item.shoppingCartData)) {
      if (this.props.item.activeRecipeId != null && val.action == 'Craft') {
        individualPrice = val.individualPrice
        cumulativeTimeSpent = val.cumulativeTimeSpent
        break
      } else if (this.props.item.activeRecipeId == null && val.action == 'Buy') {
        individualPrice = val.individualPrice
        cumulativeTimeSpent = val.cumulativeTimeSpent
        break
      }
    }

    for (const [recipePath, {expectedCount, action}] of Object.entries(this.props.item.shoppingCartData)) {
      if (this.props.item.name == "Acacia Plywood") {
        console.log("TEMP TEST Reset?", action, expectedCount, cumulativeTimeSpent, this.props.item)
      }
      if (action == 'Buy') {
        buyCount += expectedCount
      } else if (action == 'Craft') {
        craftCount += expectedCount
      }
    }

    individualPrice = parseInt(individualPrice);

    const {profit, profitPerSecond} = ProfitCalculator.calculateProfitValuesForItem(this.props.item)

    return (
      <div
        style={{
          paddingLeft: "20px",
          paddingTop: "0px",
          paddingBottom: "20px",
        }}
      >
        <h4>
          {" "}
          <Badge variant="danger">
            {`Market Price: ${numberWithCommas(marketPrice)} silver`}
          </Badge>
        </h4>

        {/* Profit */}
        <h4>
          <Badge variant="success">{`Total Profit: ${numberWithCommas(Math.floor(
            profit * craftCount
          ))} silver`}</Badge>
        </h4>
        <h4>
          <Badge variant="success">{`Profit per item: ${numberWithCommas(Math.floor(
            profit
          ))} silver`}</Badge>
        </h4>
        <h4>
          <Badge variant="success">{`Profit per sec: ${numberWithCommas(profitPerSecond)} silver/second`}</Badge>
        </h4>

        {/* Silver spent */}
        <h4>
          <Badge variant="warning">
            {`${numberWithCommas(individualPrice * craftCount)} silver spent to get these materials`}
          </Badge>
        </h4>
        <h4>
          <Badge variant="warning">{`${numberWithCommas(individualPrice)} silver spent per item.`}</Badge>
        </h4>

        {/* Time spent */}
        <h4>
          <Badge variant="info">{`${numberWithCommas((cumulativeTimeSpent * craftCount).toFixed(
            2
          ))} total seconds crafting`}</Badge>
        </h4>
        <h4>
          <Badge variant="info">{`${numberWithCommas(cumulativeTimeSpent.toFixed(
            2
          ))} seconds spent to craft one of these items`}</Badge>
        </h4>
      </div>
    );
  }

  /**
   * Renders the chips right below the title
   * @param {[Recipe]} allRecipes An array of Recipe objects
   * @param {string} selectedRecipeId The selected recipe. If null, the action is 'Buy'
   * @param {} productName The name of the product being bought/crafted
   */
  renderChips(allRecipes, selectedRecipeId, productName) {
    
    return (
      <div
        id="toolbar-container"
        style={{
          padding: "10px 0px 10px 20px",
        }}
      >
        {/* <Chip clickable={false} style={{borderRadius: "3px"}} label={'Buy or Craft?:'}></Chip> */}
        {!this.props.item.isSymbolic && <Chip
          className="recipeChip"
          clickable
          label="Buy"
          color={selectedRecipeId == null ? "primary" : "secondary"}
          style={{ marginRight: 5 }}
          onClick={() => {
            console.log(`Clicked buy | id: ${productName}`);
            this.props.onBuyClick(productName, Object.keys(this.props.item.shoppingCartData))
          }}
        />}
        
        {Object.keys(allRecipes).map((recipe_id, index) => {
          if (allRecipes[recipe_id].quantityProduced == null) return null;
          const isSelected = selectedRecipeId === recipe_id;
          let isDisabled = false

          // If an ingredient doesn't have market data and isn't symbolic
          for (const ingredient of allRecipes[recipe_id].ingredients) {
            if (!this.props.itemHasMarketData(ingredient['Item Name'])) {
              isDisabled = true;
              break;
            }
          }
          let recipeLabel = this.props.item.isSymbolic ? allRecipes[recipe_id].ingredients[0]['Item Name'] : `Recipe #${index}` 
          return (
            <Chip
              key={recipe_id}
              className="recipeChip"
              clickable
              label={recipeLabel}
              color={isSelected ? "primary" : "secondary"}
              style={{ marginRight: 5 }}
              onClick={() => {
                console.log(`Clicked recipe# ${index} | id: ${recipe_id}`);
                this.props.onRecipeClick(productName, recipe_id, Object.keys(this.props.item.shoppingCartData)) 
              }}
              disabled={isDisabled}
            />
          );
        })}
      </div>
    );
  }

  renderParentLinks(recipePaths) {
    return (
      <div
        id="toolbar-subtitle"
        style={{ fontSize: "0.8em", paddingLeft: "25px" }}
      >
        {
          recipePaths.map((recipePath) => {
            if (recipePath == null || recipePath == '') return null;
            let recipeArr = recipePath.split('/')
            let everythingButLast = recipeArr.slice(0, -1).join('/')
            let last = recipeArr.slice(-1).join('/')
            let data = this.props.item.shoppingCartData[`${recipePath}/${this.props.item.name}`]
            return (
              <div key={recipePath}>
                {`x${data != null ? data.expectedCount : 'Invalid path? ' + recipePath} for`}
                <Link
                  activeClass="active"
                  className="scrollLink text-primary"
                  to={last}
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  {everythingButLast}
                  <span className="font-weight-bold">{`/${last}`}</span>
                </Link>
              </div>
            )
          }) 
        }
        
      </div>
    );
  }

  render() {
    const { productName, item } = this.props;
    const {
      shoppingCartData,
      recipes: allRecipes,
      activeRecipeId: selectedRecipeId,
    } = item;
    const selectedRecipe =
      selectedRecipeId != null ? allRecipes[selectedRecipeId] : null;
    let rowData = [];

    if (selectedRecipe != null) rowData = [...selectedRecipe.ingredients];

    let parentPaths = []
    let totalCount = 0
    for (let ingredient of rowData) {
      ingredient["Total Needed"] = 0
    }

    for (const [recipePath, shoppingCart] of Object.entries(item.shoppingCartData)) {
      console.log('Reset???', item.name, item.shoppingCartData, recipePath)
      totalCount += shoppingCart.expectedCount
      parentPaths.push(recipePath.split('/').slice(0,-1).join('/'))

      const recipePathArr = recipePath.split('/')
      const containsLoop = new Set(recipePathArr).size !== recipePathArr.length
      if (containsLoop) continue

      for (let ingredient of rowData) {
        ingredient["Total Needed"] = (ingredient["Total Needed"]) + ingredient["Amount"] * shoppingCart.craftCount;
      }
    }

    return (
      <Element name={item.name} className="m-4">
        <MaterialTable
          icons={tableIcons}
          columns={[
            {
              title: `Name`,
              field: "Item Name",
              render: (rowData) => (
                <Link
                  activeClass="active"
                  className="scrollLink text-primary"
                  // to={rowData["Item Name"]}
                  to={`${rowData['Item Name']}`}
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  {rowData["Item Name"]}
                </Link>
              ),
            },
            { title: "Amount per Craft", field: "Amount" },
            { title: "Total Needed", field: "Total Needed" },
          ]}
          data={selectedRecipe == null ? [] : rowData} // TODO: Which recipe to choose?
          // title={`${productName}` + (parentName != null ? `... for ${parentName}` : '')}
          title={`${productName} (x${totalCount})`}
          options={{
            search: false,
            paging: false,
            header: selectedRecipe == null ? false : true,
          }}
          localization={{
            body: {
              emptyDataSourceMessage:
                "You must gather/purchase this ingredient",
            },
          }}
          components={{
            Toolbar: (props) => {
              return (
                <div
                  id="toolbar"
                  style={{
                    backgroundColor: "rgb(230, 230, 230)",
                  }}
                >
                  <MTableToolbar
                    {...props}
                    style={{ "text-align": "center" }}
                  />
                  {/* <div {...props}>{props.title}</div> */}
                  {this.renderParentLinks(parentPaths)}
                  {this.renderChips(
                    allRecipes,
                    selectedRecipeId,
                    productName
                  )}
                  {this.renderDetailsButton()}
                </div>
              );
            },
          }}
        />
      </Element>
    )
  }
}

export default RecipesTable;
