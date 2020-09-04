// Main packages
import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Events, scrollSpy } from "react-scroll";
import axios from "axios";
import _ from "lodash";

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

// Redux
import { itemsSet, itemsOrderSet, rootItemSet } from "../store/items";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { marketPriceOverrided } from "../store/calculator";

const cloneItems = (items: { [key: string]: Item }) => {
  const newItems = {};
  for (const item of Object.values(items)) {
    const newItem = cloneItem(item);
    newItems[item.name] = newItem;
  }
  return newItems;
};

const cloneItem = (item: Item) => {
  const newItem = classToObject(item);
  return newItem;
};

const classToObject = (theClass: any): any => {
  return JSON.parse(JSON.stringify(theClass));
};

type DashboardProps = {
  product: string;
  setProduct: any;
};

/**
 * @deprecated
 */
type DashboardState = {
  craftCount: number;
};

const RecipesDashboard: React.FC<DashboardProps> = ({
  product,
  setProduct,
}) => {
  const dispatch = useDispatch();

  let itemManager: ItemManager = useMemo(() => new ItemManager(), []);

  const orderedItems = useSelector(
    (state: RootState) => state.entities.items.order
  );

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

  const updateTables = useCallback(() => {
    console.log(
      "Update Tables using data... | (itemManager.items): ",
      itemManager.items
    );

    // Dispatch a setItems action
    const newItems = cloneItems(itemManager.items);
    dispatch(itemsSet(newItems));

    // Order array
    let newOrderedItems = Object.values(newItems) as [Item];

    newOrderedItems = newOrderedItems.sort(function (a, b) {
      return a.depth - b.depth;
    });
    newOrderedItems = _.map(newOrderedItems, "name");
    dispatch(itemsOrderSet(newOrderedItems));
  }, [dispatch]);
  /**
   * Call back-end API to retrives all recipes associated
   * @param {string} productName
   */
  const getData = useCallback(
    async (productName) => {
      try {
        // Get the data
        const { data: recipes } = await axios.get(
          API_ENDPOINT + "/recipes?item=" + productName
        );
        console.log("Original Recipes", recipes);
        const items = itemManager.parseRecipes(recipes);
        itemManager.resetToOptimal();
        console.log("Final Items", items);
        dispatch(rootItemSet(itemManager.officialProductName));
        updateTables();
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, updateTables]
  );

  useEffect(() => {
    getData(product);
  }, [product, getData]);

  const renderTables = () => {
    if (itemManager == null) return;

    if (itemManager.officialProductName === "") {
      return (
        <React.Fragment>
          <h2 style={{ textAlign: "center" }}>An unexpected error occured.</h2>
          <p style={{ textAlign: "center" }}>
            It seems as if{" "}
            <span className={"font-weight-bold"}>'{product}'</span> doesn't
            exist in our database. Please contact me on discord{" "}
            <span className={"font-weight-bold"}>@Kitsune#1040 </span>and let me
            know if you want this item added to the database.
          </p>
        </React.Fragment>
      );
    }

    return (
      <div>
        {orderedItems.map((currentItemName) => {
          return (
            <RecipesTable
              key={`${currentItemName}`}
              productName={currentItemName}
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
        onUpdateCraftCount={(newCraftCount) => {
          itemManager.recalculate({ craftCount: newCraftCount });
          updateTables();
        }}
        onUpdateValuePack={(valuePackEnabled) => {
          ProfitCalculator.valuePackEnabled = valuePackEnabled;
          itemManager.resetToOptimal();
          updateTables();
        }}
        onMarketPriceChange={(newMarketPrice) => {
          itemManager.items[
            itemManager.officialProductName
          ].overrideMarketPrice = newMarketPrice;
          dispatch(
            marketPriceOverrided({
              itemName: itemManager.officialProductName,
              marketPrice: newMarketPrice,
            })
          );
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
