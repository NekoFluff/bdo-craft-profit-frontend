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
import { ButtonGroup, Button } from "react-bootstrap";

class RecipesTable extends Component {
  state = {};

  renderButtonGroup = (selectedRecipe, craftOrBuy) => {
    return (
      <ButtonGroup aria-label="Basic example">
        {selectedRecipe != null && (
          <Button
            variant={craftOrBuy == "Craft" ? "primary" : "secondary"}
            className="buyOrCraftButton"
            onClick={() => {
              console.log("Clicked Craft", this.props);
              this.props.onCraftOrBuyClick("Craft");
            }}
          >
            Craft
          </Button>
        )}

        <Button
          variant={craftOrBuy == "Buy" ? "primary" : "secondary"}
          className="buyOrCraftButton"
          onClick={() => {
            console.log("Clicked Buy", this.props);
            this.props.onCraftOrBuyClick("Buy");
          }}
        >
          Buy
        </Button>
      </ButtonGroup>
    );
  };

  renderRecipeChips(allRecipes, selectedRecipeId, productName) {
    return (
      <div id="toolbar-container-recipes">
        {Object.keys(allRecipes).map((recipe_id, index) => {
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

  renderCraftBuyChips(selectedRecipe, craftOrBuy) {
    return (
      <>
        {selectedRecipe != null && (
          <Chip
            clickable
            className="buyOrCraftChip"
            label="Craft"
            color={craftOrBuy == "Craft" ? "primary" : "secondary"}
            style={{ marginRight: 5 }}
            onClick={() => {
              console.log("Clicked Craft", this.props);
              this.props.onCraftOrBuyClick("Craft");
            }}
          />
        )}
        {/* <span style={{paddingRight: "2px"}}>or</span> */}
        <Chip
          clickable
          className="buyOrCraftChip"
          label="Purchase"
          color={craftOrBuy == "Buy" ? "primary" : "secondary"}
          style={{ marginRight: 5 }}
          onClick={() => {
            console.log("Clicked Craft", this.props);
            this.props.onCraftOrBuyClick("Buy");
          }}
        />
      </>
    );
  }

  render() {
    const { productName, item } = this.props;
    const allRecipes = item.recipes;
    const selectedRecipeId = item.activeRecipeId;
    const selectedRecipe =
      selectedRecipeId != null ? allRecipes[selectedRecipeId] : null;

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
                      title: "Name",
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
                    { title: "Amount", field: "Amount" },
                  ]}
                  data={
                    selectedRecipe != null ? selectedRecipe.ingredients : []
                  } // TODO: Which recipe to choose?
                  // title={`${productName}` + (parentName != null ? `... for ${parentName}` : '')}
                  title={productName}
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
                          {parentName != null ? (
                            <div
                              id="toolbar-subtitle"
                              style={{ fontSize: "0.8em", paddingLeft: "25px" }}
                            >
                              {"for "}
                              {/* TODO: Replace span with Link */}

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
                          ) : null}

                          <div
                            id="toolbar-container"
                            style={{
                              padding: "10px 0px 20px 20px",
                            }}
                          >
                            {this.renderRecipeChips(allRecipes, selectedRecipeId, productName)}

                            <div
                              style={{ padding: "20px 0px 0px 0px" }}
                              id="toolbar-container-craft-purchase"
                            >
                              {this.renderButtonGroup(
                                selectedRecipe,
                                craftOrBuy
                              )}
                              <div style={{paddingTop: "10px"}}></div>
                              {this.renderCraftBuyChips(selectedRecipe, craftOrBuy)}
                            </div>
                          </div>
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
