import { Chip } from "@material-ui/core";
import { ProfitCalculator } from "bdo-shopping-cart-package";
import { getMarketPriceForItem } from "bdo-shopping-cart-package";
import MaterialTable, { MTableToolbar } from "material-table";
import React, { useContext, useState } from "react";
import {
  Accordion,
  AccordionContext,
  Badge,
  Button,
  Card,
  useAccordionToggle,
} from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { Element, Link } from "react-scroll";

import numberWithCommas from "../../helpers/numberWithCommas";
import secondsToHms from "../../helpers/secondsToHms";
import tableIcons from "../../helpers/tableIcons";
import { RootState } from "../../store/reducer";

import "../../scss/RecipesTable.scss";

type ContextAwareToggleProps = {
  eventKey: string;
  callback?: any;
};

const ContextAwareToggle: React.FC<ContextAwareToggleProps> = ({
  eventKey,
  callback,
}) => {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <Button onClick={decoratedOnClick}>
      {isCurrentEventKey ? "Hide Profit Details" : "Show Profit Details"}
    </Button>
  );
};

type RecipesTableProps = {
  key: string;
  productName: string;
  onRecipeClick: (
    itemName: string,
    recipeId: string,
    recipePaths: string[]
  ) => void;
  onBuyClick: (itemName: string, recipePaths: string[]) => void;
  itemHasMarketData: (itemName: string) => boolean;
};

const RecipesTable: React.FC<RecipesTableProps> = (props) => {
  const [activeKey, setActiveKey] = useState("");
  const item = useSelector((state: RootState) => {
    return state.entities.items.data[props.productName];
  });

  if (item == null) return null;
  if (Object.values(item.usedInRecipes).length === 0) return null;

  const renderDetailsButton = () => {
    return (
      <Accordion
        activeKey={activeKey}
        onSelect={(key) => {
          setActiveKey(key);
        }}
      >
        <Card>
          <Card.Header>
            <ContextAwareToggle eventKey="0" />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{renderBadges()}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  };

  const renderBadges = () => {
    if (item == null) return;
    const marketPrice = getMarketPriceForItem(item);

    // let buyCount = 0; // Total number of items
    let craftCount = 0;
    let timesCrafted = 0; // Number of times this has been done
    let timesBought = 0;

    let individualPrice = -1;
    let cumulativeTimeSpent = -1;
    for (const val of Object.values(item.shoppingCartData)) {
      if (item.activeRecipeId !== "" && val.action === "Craft") {
        individualPrice = val.individualPrice;
        cumulativeTimeSpent = val.cumulativeTimeSpent;
        break;
      } else if (item.activeRecipeId === "" && val.action === "Buy") {
        individualPrice = val.individualPrice;
        cumulativeTimeSpent = val.cumulativeTimeSpent;
        break;
      }
    }

    for (const {
      expectedCount,
      action,
      craftCount: repeatCount,
    } of Object.values(item.shoppingCartData)) {
      if (action === "Buy") {
        // buyCount += expectedCount;
        timesBought += repeatCount;
      } else if (action === "Craft") {
        craftCount += expectedCount;
        timesCrafted += repeatCount;
      }
    }

    individualPrice = Math.round(individualPrice);

    const {
      profit,
      profitPerSecond,
    } = ProfitCalculator.calculateProfitValuesForItem(item);

    return (
      <div
        style={{
          paddingLeft: "20px",
          paddingTop: "0px",
          paddingBottom: "20px",
        }}
      >
        <div>
          {" "}
          <Badge variant="danger">
            {`Market Price: ${numberWithCommas(marketPrice)} silver`}
          </Badge>
        </div>

        {/* Profit */}
        <div>
          <Badge variant="success">{`Total Profit: ${numberWithCommas(
            Math.floor(profit * craftCount)
          )} silver`}</Badge>
        </div>
        <div>
          <Badge variant="success">{`Profit per item: ${numberWithCommas(
            Math.floor(profit)
          )} silver`}</Badge>
        </div>
        <div>
          <Badge variant="success">{`Profit per sec: ${numberWithCommas(
            profitPerSecond.toFixed(2)
          )} silver/second`}</Badge>
        </div>

        {/* Silver spent */}
        <div>
          <Badge variant="warning">
            {`${numberWithCommas(
              action === "Buy"
                ? individualPrice * timesBought
                : individualPrice * craftCount
            )} silver spent to get these materials`}
          </Badge>
        </div>
        <div>
          <Badge variant="warning">{`${numberWithCommas(
            individualPrice
          )} silver spent per item.`}</Badge>
        </div>

        {/* Time spent */}
        <div>
          <Badge variant="info">{`${numberWithCommas(
            (cumulativeTimeSpent * craftCount).toFixed(2)
          )} total seconds crafting`}</Badge>
        </div>
        <div>
          <Badge variant="info">{`${numberWithCommas(
            cumulativeTimeSpent.toFixed(2)
          )} seconds spent to craft one of these items`}</Badge>
        </div>
        <div>
          <Badge variant="dark">{`${numberWithCommas(
            timesCrafted
          )} times crafted`}</Badge>
        </div>
        <div>
          <Badge variant="dark">{`${numberWithCommas(
            timesBought
          )} times bought`}</Badge>
        </div>
      </div>
    );
  };

  /**
   * Renders the chips right below the title
   * @param {[Recipe]} allRecipes An array of Recipe objects
   * @param {string} selectedRecipeId The selected recipe. If null, the action is 'Buy'
   * @param {} productName The name of the product being bought/crafted
   */
  const renderChips = (allRecipes, selectedRecipeId, productName) => {
    return (
      <div
        id="toolbar-container"
        style={{
          padding: "5px 0px 10px 20px",
        }}
      >
        {/* <Chip clickable={false} style={{borderRadius: "3px"}} label={'Buy or Craft?:'}></Chip> */}
        {!item.isSymbolic && (
          <Chip
            className="recipeChip"
            clickable
            label="Buy"
            color={selectedRecipeId === "" ? "primary" : "secondary"}
            style={{ marginRight: 5 }}
            onClick={() => {
              console.log(`Clicked buy | id: ${productName}`);
              props.onBuyClick(productName, [
                ...Object.keys(item.shoppingCartData),
              ]);
            }}
          />
        )}

        {Object.keys(allRecipes).map((recipe_id, index) => {
          if (
            allRecipes[recipe_id].quantityProduced == null ||
            allRecipes[recipe_id].quantityProduced === 0
          )
            return null;
          const isSelected = selectedRecipeId === recipe_id;
          let isDisabled = false;

          // If an ingredient doesn't have market data and isn't symbolic
          for (const ingredient of allRecipes[recipe_id].ingredients) {
            if (!props.itemHasMarketData(ingredient["Item Name"])) {
              isDisabled = true;
              break;
            }
          }
          let recipeLabel = item.isSymbolic
            ? allRecipes[recipe_id].ingredients[0]["Item Name"]
            : `Craft #${index}`;
          return (
            <Chip
              key={recipe_id}
              className="recipeChip"
              clickable
              label={recipeLabel}
              color={isSelected ? "primary" : "secondary"}
              style={{ marginRight: 5 }}
              onClick={() => {
                console.log(
                  `[${productName}] Clicked recipe# ${index} | id: ${recipe_id}`
                );
                props.onRecipeClick(
                  productName,
                  recipe_id,
                  Object.keys(item.shoppingCartData)
                );
              }}
              disabled={isDisabled}
            />
          );
        })}
      </div>
    );
  };

  const renderParentLinks = (recipePaths) => {
    return (
      <div
        id="toolbar-subtitle"
        style={{ fontSize: "0.8em", paddingLeft: "25px" }}
      >
        {recipePaths.map((recipePath) => {
          if (recipePath == null || recipePath === "") return null;
          let recipeArr = recipePath.split("/");
          let everythingButLast = recipeArr.slice(0, -1).join("/");
          let last = recipeArr.slice(-1).join("/");
          let data = item.shoppingCartData[`${recipePath}/${item.name}`];
          return (
            <div key={recipePath}>
              {`x${
                data != null
                  ? data.expectedCount
                  : "Invalid path? " + recipePath
              } for `}
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
          );
        })}
      </div>
    );
  };

  const { productName } = props;
  const {
    shoppingCartData,
    recipes: allRecipes,
    activeRecipeId: selectedRecipeId,
  } = item;
  const action = selectedRecipeId !== "" ? "Craft" : "Buy";
  const selectedRecipe =
    selectedRecipeId !== "" ? allRecipes[selectedRecipeId] : null;
  let selectedRecipeAction = "";
  let quantityProduced = 0;
  let rowData = [];

  if (selectedRecipe != null) {
    rowData = [];
    for (const i of selectedRecipe.ingredients) {
      rowData.push({
        ...i,
        "Total Needed": 0,
      });
    }
    selectedRecipeAction = selectedRecipe["action"];
    quantityProduced = selectedRecipe["quantityProduced"];
  }

  let parentPaths = [];
  let totalItemCount = 0;
  let craftCount = 0;
  let totalTimeSpent = 0;

  for (const [recipePath, shoppingCart] of Object.entries(shoppingCartData)) {
    totalItemCount += shoppingCart.expectedCount;
    parentPaths.push(recipePath.split("/").slice(0, -1).join("/"));

    const recipePathArr = recipePath.split("/");
    const containsLoop = new Set(recipePathArr).size !== recipePathArr.length;
    if (containsLoop) continue;
    craftCount += shoppingCart.craftCount; //Counts for crafting and buying
    totalTimeSpent +=
      shoppingCart.expectedCount * shoppingCart.cumulativeTimeSpent;

    for (let ingredient of rowData) {
      ingredient["Total Needed"] =
        ingredient["Total Needed"] +
        ingredient["Amount"] * shoppingCart.craftCount;
    }
  }

  return (
    <Element name={item.name} className="m-4">
      <MaterialTable
        icons={tableIcons}
        columns={[
          {
            title: `Ingredients`,
            field: "Item Name",
            render: (rowData) => (
              <Link
                activeClass="active"
                className="scrollLink text-primary"
                // to={rowData["Item Name"]}
                to={`${rowData["Item Name"]}`}
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
        title={`${productName} (x${totalItemCount})`}
        options={{
          search: false,
          paging: false,
          header: selectedRecipe == null ? false : true,
        }}
        localization={{
          body: {
            emptyDataSourceMessage: "You must gather/purchase this ingredient",
          },
        }}
        components={{
          Toolbar: (props) => {
            return (
              <div
                id="toolbar"
                style={{
                  backgroundColor: "rgb(200, 200, 200)",
                }}
              >
                <div className="d-flex flex-col align-items-center">
                  {console.log("PROPS", props)}
                  <LazyLoadImage
                    // alt={image.alt}
                    height={"30px"}
                    width={"30px"}
                    src={item.image} // use normal <img> attributes as props
                    style={{ marginRight: "0px", marginLeft: "24px" }}
                  />
                  <MTableToolbar
                    {...props}
                    style={{ "text-align": "left", width: "200px" }}
                  ></MTableToolbar>
                </div>

                {/* <div {...props}>{props.title}</div> */}

                {renderParentLinks(parentPaths)}

                {selectedRecipeAction !== "Symbolic" && (
                  <div
                    id="toolbar-subtitle-action "
                    style={{ fontSize: "0.8em", paddingLeft: "25px" }}
                  >
                    <span className="font-weight-bold">
                      {action === "Buy"
                        ? "Buy or Gather"
                        : selectedRecipeAction +
                          ` [Craft ${craftCount} times] (${secondsToHms(
                            totalTimeSpent
                          )})`}
                    </span>
                  </div>
                )}
                {action !== "Buy" && selectedRecipeAction !== "Symbolic" && (
                  <div
                    id="toolbar-subtitle-items-per-craft"
                    style={{ fontSize: "0.8em", paddingLeft: "25px" }}
                  >
                    <span className="font-weight-bold">
                      {`${quantityProduced} ${
                        quantityProduced === 1 ? "item" : "items"
                      } per craft`}
                    </span>
                  </div>
                )}
                <div
                  id="toolbar-subtitle-items-per-craft"
                  style={{
                    fontSize: "0.8em",
                    paddingLeft: "25px",
                    paddingTop: "1rem",
                  }}
                >
                  <span className="text-muted">
                    Pick one of the options below (Blue color = currently
                    selected):
                  </span>
                </div>
                {renderChips(allRecipes, selectedRecipeId, productName)}
                {renderDetailsButton()}
              </div>
            );
          },
        }}
      />
    </Element>
  );
};

export default RecipesTable;
