// Main packages
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Events, scrollSpy } from "react-scroll";
import axios from "axios";

// My package
import { ProfitCalculator, ItemManager } from "bdo-shopping-cart-package";
import { Item } from "bdo-shopping-cart-package";

// Helpers
import { API_ENDPOINT } from "../helpers/CONSTANTS";

// Other omponents
import RecipesDashboardButton from "./RecipesDashboardButton";
import RecipesDashboardSidebar from "./RecipesDashboardSidebar";
import RecipesTable from "./RecipesTable";
import MyNavBar from "./Navbar";
import SearchBar from "./SearchBar";

type DashboardProps = {
  product: string;
  setProduct: any;
};

/**
 * @deprecated
 */
type DashboardState = {
  recipeTables: Item[];
  // openProfitDetails: any;
  craftCount: number;
};

let itemManager: ItemManager = new ItemManager();

const RecipesDashboard: React.FC<DashboardProps> = ({
  product,
  setProduct,
}) => {
  const dispatch = useDispatch();
  const [recipeTables, setRecipeTables] = useState([]);
  const [craftCount, setCraftCount] = useState(0);

  scrollSpy.update();

  useEffect(() => {
    Events.scrollEvent.register("begin", function (to, element) {
      console.log("Begin Scroll", arguments);
    });

    Events.scrollEvent.register("end", function (to, element) {
      console.log("End Scroll", arguments);
    });

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  useEffect(() => {
    getData(product);
  }, [product]);

  /**
   * Call back-end API to retrives all recipes associated
   * @param {string} productName
   */
  const getData = async (productName) => {
    try {
      console.log("TEMP - GET DATA", productName);
      // Get the data
      const { data: recipes } = await axios.get(
        API_ENDPOINT + "/recipes?item=" + productName
      );
      console.log("Original Recipes", recipes);
      const items = itemManager.parseRecipes(recipes);
      itemManager.resetToOptimal();
      console.log("Final Items", items);
      updateTables();
    } catch (e) {
      console.log(e);
    }
  };

  const updateTables = () => {
    console.log(
      "Update Tables using data... | (itemManager.items): ",
      itemManager.items
    );

    // Convert itemManager.items into array
    let recipeTables = Object.values(itemManager.items);
    recipeTables = recipeTables.filter(function (item) {
      return (
        Object.keys(item.shoppingCartData).length > 0 ||
        item.activeRecipeId !== ""
      );
    });
    recipeTables = recipeTables.sort(function (a, b) {
      return a.depth - b.depth;
    });

    setRecipeTables(recipeTables);
  };

  const renderTables = () => {
    if (recipeTables.length === 0 && itemManager != null) {
      if (itemManager.officialProductName == null) {
        return (
          <React.Fragment>
            <h2 style={{ textAlign: "center" }}>
              An unexpected error occured.
            </h2>
            <p style={{ textAlign: "center" }}>
              It seems as if{" "}
              <span className={"font-weight-bold"}>'{product}'</span> doesn't
              exist in our database. Please contact me on discord{" "}
              <span className={"font-weight-bold"}>@Kitsune#1040 </span>and let
              me know if you want this item added to the database.
            </p>
          </React.Fragment>
        );
      } else {
        return (
          <h2 style={{ textAlign: "center" }}>
            Use the search bar to select a recipe
          </h2>
        );
      }
    }

    return (
      <div>
        {itemManager != null &&
          recipeTables.map((item, index) => {
            return (
              <RecipesTable
                key={`${item.name}`}
                productName={item.name}
                item={item}
                onRecipeClick={(itemName, recipeId, recipePaths) => {
                  for (const path of recipePaths) {
                    itemManager.resetRecipePath(itemName, path);
                  }
                  for (const path of recipePaths) {
                    itemManager.selectRecipe(itemName, recipeId, path);
                  }
                  updateTables();
                }}
                onBuyClick={(itemName, recipePaths) => {
                  for (const path of recipePaths) {
                    itemManager.resetRecipePath(itemName, path);
                  }
                  for (const path of recipePaths) {
                    itemManager.selectRecipe(itemName, "", path);
                  }
                  updateTables();
                }}
                // detailsShown={openProfitDetails[item.name]}
                // onProfitDetailsButtonPressed={(itemName) => {
                //   const temp = { ...this.state.openProfitDetails };
                //   temp[itemName] =
                //     temp[itemName] == null || temp[itemName] === false
                //       ? true
                //       : false;
                //   this.setState({ openProfitDetails: temp });
                // }}
                itemHasMarketData={(itemName) => {
                  return (
                    itemManager.items[itemName] != null &&
                    (itemManager.items[itemName].marketData != null ||
                      itemManager.items[itemName].isSymbolic)
                  );
                }}
              ></RecipesTable>
            );
          })}
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      // <Sticky className="mt-4" enabled={true} top={50}>
      <RecipesDashboardSidebar
        recipeTables={recipeTables}
        onUpdateCraftCount={(newCraftCount) => {
          setCraftCount(newCraftCount);
          itemManager.recalculate({ craftCount: newCraftCount });
          updateTables();
        }}
        onUpdateValuePack={(valuePackEnabled) => {
          ProfitCalculator.valuePackEnabled = valuePackEnabled;
          itemManager.resetToOptimal();
          updateTables();
        }}
        onMarketPriceChange={(newMarketPrice) => {
          itemManager.items[itemManager.officialProductName][
            "overrideMarketPrice"
          ] = newMarketPrice;
          itemManager.resetToOptimal();
          updateTables();
        }}
      ></RecipesDashboardSidebar>
      // </Sticky>
    );
  };

  return (
    <>
      {renderSidebar()}
      <div id="page-wrap">
        <MyNavBar></MyNavBar>
        <h1 className="p-3" style={{ textAlign: "center" }}>
          Craft Profit v0.2.0
        </h1>
        <RecipesDashboardButton />

        <div className="p-3" style={{ textAlign: "center" }}>
          <SearchBar
            onSearch={(newProduct) => {
              setProduct(newProduct);
            }}
          />
        </div>
        {renderTables()}
      </div>
    </>
  );
};

export default RecipesDashboard;
