import React, { Component } from "react";
import MaterialTable, { MTableToolbar } from "material-table"; // https://material-table.com/#/
import tableIcons from "../helpers/tableIcons";
import { Chip } from "@material-ui/core";
import "../css/RecipeTable.css";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { ButtonGroup, Button, Badge } from "react-bootstrap";

class RecipesTable extends Component {
  state = {};

  renderBadges() {
    const { shoppingCartData, marketData, valuePack } = this.props.item;
    const marketPrice = this.props.item.getMarketPrice()
    let {
      expectedCount: count,
      individualPrice,
      cumulativeTimeSpent
    } = shoppingCartData;

    individualPrice = parseInt(individualPrice)
    
    let sellingPrice = marketPrice * 0.65
    if (valuePack) sellingPrice = 1.3 * sellingPrice
    const profit = (sellingPrice) - (individualPrice)
    const profitPerSecond = Math.floor(profit / cumulativeTimeSpent)

    return (
      <div
        style={{
          paddingLeft: "20px",
          paddingTop: "0px",
          paddingBottom: "20px",
        }}
      >
        <Badge variant="danger">
          {`Market Price: ${marketPrice} silver`}
        </Badge>
        
        {/* Profit */}
        <div></div>
        <Badge variant="success">{`Total Profit: ${Math.floor(profit * count)} silver`}</Badge>
        <div></div>
        <Badge variant="success">{`Profit per item: ${Math.floor(profit)} silver`}</Badge>
        <div></div>
        <Badge variant="success">{`Profit per sec: ${profitPerSecond} silver/second`}</Badge>

        {/* Silver spent */}
        <div></div>
        <Badge variant="warning">
          {`${individualPrice * count} silver spent to get these materials`}
        </Badge>
        <div></div>
        <Badge variant="warning">{`${individualPrice} silver per item.`}</Badge>

        {/* Time spent */}
        <div></div>
        <Badge variant="info">{`${(cumulativeTimeSpent * count).toFixed(2)} total seconds`}</Badge>
        <div></div>
        <Badge variant="info">{`${(cumulativeTimeSpent).toFixed(2)} seconds per item`}</Badge>

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
        <Chip
          className="recipeChip"
          clickable
          label="Buy"
          color={selectedRecipeId == null ? "primary" : "secondary"}
          style={{ marginRight: 5 }}
          onClick={() => {
            console.log(`Clicked buy | id: ${productName}`);
            this.props.onBuyClick(productName);
          }}
        />
        {Object.keys(allRecipes).map((recipe_id, index) => {
          if (allRecipes[recipe_id].quantityProduced == null) return (null)
          const isSelected = selectedRecipeId == recipe_id;
          return (
            <Chip
              className="recipeChip"
              clickable
              label={`Recipe #${index}`}
              color={isSelected ? "primary" : "secondary"}
              style={{ marginRight: 5 }}
              onClick={() => {
                console.log(`Clicked recipe# ${index} | id: ${recipe_id}`);
                this.props.onRecipeClick(productName, recipe_id);
              }}
            />
          );
        })}
      </div>
    );
  }

  renderParentLink(parentName) {
    if (parentName == null) return null;
    return (
      <div
        id="toolbar-subtitle"
        style={{ fontSize: "0.8em", paddingLeft: "25px" }}
      >
        {"for "}
        <Link
          activeClass="active"
          className="scrollLink text-primary"
          to={parentName}
          spy={true}
          smooth={true}
          duration={500}
        >
          {parentName}
        </Link>
      </div>
    );
  }

  render() {
    const { productName, item} = this.props;
    const { shoppingCartData, recipes: allRecipes, activeRecipeId: selectedRecipeId } = item
    const selectedRecipe =
      selectedRecipeId != null ? allRecipes[selectedRecipeId] : null;
    let rowData = []
    
    if (selectedRecipe != null)
      rowData = [...selectedRecipe.ingredients]
      
    for (let ingredient of rowData) {
      ingredient['Total Needed'] = ingredient['Amount'] * shoppingCartData.craftCount
    }

    // console.log("recipesTable.jsx | RENDERING ITEM", item)
    return (
      <>
        {item.usedInRecipes.map(
          ({ actionTaken: craftOrBuy, parentRecipeId, parentName }, index) => {
            return (
              <Element name={item.name} className="m-4">
                <MaterialTable
                  name={item.name}
                  icons={tableIcons}
                  columns={[
                    {
                      title: `Name`,
                      field: "Item Name",
                      render: (rowData) => (
                        <Link
                          activeClass="active"
                          className="scrollLink text-primary"
                          to={rowData["Item Name"]}
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
                  data={
                    selectedRecipe != null ? rowData : []
                  } // TODO: Which recipe to choose?
                  // title={`${productName}` + (parentName != null ? `... for ${parentName}` : '')}
                  title={`${productName} (x${shoppingCartData.expectedCount})`}
                  options={{
                    search: false,
                    paging: false,
                    header: selectedRecipe != null ? true : false,
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
                          {this.renderParentLink(parentName)}
                          {this.renderChips(
                            allRecipes,
                            selectedRecipeId,
                            productName
                          )}
                          {this.renderBadges()}
                        </div>
                      );
                    },
                  }}
                />
              </Element>
            );
          }
        )}
      </>
    );
  }
}

export default RecipesTable;
