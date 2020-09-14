import { Item } from "bdo-shopping-cart-package";
import * as d3 from "d3";
import { HierarchyNode } from "d3";

// Build mapping
function buildTreeMapping(data) {
  return data;
}

// Build tree
function buildTree(
  item: Item,
  itemMapping: { [key: string]: Item } = {},
  alreadySeen: { [key: string]: boolean } = {},
  previousPath = ""
) {
  let discontinue = false;
  if (alreadySeen[item.name]) discontinue = true;
  alreadySeen[item.name] = true;
  const path = `${previousPath}/${item.name}`;
  let tree = { ...item };
  tree["isOpen"] = true;
  tree["path"] = path;
  tree["action"] = item.shoppingCartData[path].action;
  if (item.recipes && item.recipes[item.activeRecipeId]) {
    if (discontinue) {
      tree["children"] = [];
    } else
      tree["children"] = item.recipes[item.activeRecipeId].ingredients
        .map((ingredient) => {
          const name = ingredient["Item Name"];
          return buildTree(
            itemMapping[name],
            itemMapping,
            { ...alreadySeen },
            path
          );
        })
        .filter((elem) => {
          return elem != null;
        });
  }
  return tree;
}

export function stackedBar(items = [], barHeight, padding = 0) {
  let y = 0;

  const recursiveReset = (items = [], barHeight, currentWidth = 0) => {
    let x = currentWidth;
    // let y = currentHeight;
    for (const item of items) {
      if (!item.data.isOpen) {
        item.data.x = x;
        item.data.y = 0;
      } else {
        item.data.x = x;
        item.data.y = y;
        y += barHeight + padding;
      }

      recursiveReset(item.children, barHeight, x);
      x += item.value || 0;
      // y = y2;
    }
    // return [x, y];
  };

  recursiveReset(items, barHeight, 0);
}

export function setCostValues(root: HierarchyNode<Item & { path: string }>) {
  root.sum(function (datum) {
    const cartEntry = datum.shoppingCartData[datum.path];
    // const path = key.split("/");
    // const itemName = path[path.length - 1];
    console.log("ITEM PATH", datum.path, datum);

    return datum.isSymbolic
      ? 0
      : datum.activeRecipeId != "" && datum["action"] === "Craft" // If crafting
      ? 0
      : datum.marketData
      ? datum.marketData["Market Price"] * cartEntry.expectedCount
      : 0;
  });
  return root;
}

export function setTimeValues(root: HierarchyNode<Item & { path: string }>) {
  root.sum(function (datum) {
    const cartEntry = datum.shoppingCartData[datum.path];

    // const path = key.split("/");
    // const itemName = path[path.length - 1];
    // console.log("ITEM PATH", datum.path, cartEntry);
    return datum.isSymbolic || datum.activeRecipeId == ""
      ? 0
      : datum.recipes[datum.activeRecipeId].timeToProduce *
          cartEntry.craftCount;
  });
  return root;
}

export function convertToTree(
  rootItem: Item,
  mapping: { [key: string]: Item } = {}
): HierarchyNode<any> | null {
  // Use methods
  // console.log("[Convert to Tree] Tree data", rootItem, mapping);
  if (rootItem == null) return null;

  const treeData = buildTree(rootItem, mapping);
  let root: any = d3.hierarchy(treeData);

  // setCostValues(root);

  // console.log("d3 stacked bar tree:", root);
  return root;
}
