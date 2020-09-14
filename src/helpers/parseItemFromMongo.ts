import * as d3 from "d3";

const sampleData = {
  _id: "5f31d21326a2b936d5b31515",
  Name: "Sturdy Acacia Plywood",
  "Min Produced": 1,
  "Max Produced": 3,
  "Quantity Produced": 2,
  "Time to Produce": 6,
  Action: "Heating",
  Recipe: [
    {
      "Item Name": "Acacia Plywood",
      Amount: 10,
    },
    {
      "Item Name": "Plywood Hardener",
      Amount: 3,
    },
  ],
  "Market Data": {
    _id: "5f15dac7cea9de4bcc5297f3",
    ID: 4682,
    "Last Update Attempt": "2020-08-27T01:58:04.761Z",
    "Last Updated": "2020-08-27T01:58:04.761Z",
    "Market Price": 350000,
    Name: "Sturdy Acacia Plywood",
    Quantity: 101,
    "Total Trade Count": 64559,
  },
  Ingredients: [
    {
      _id: "5f36115282d3cdbd58fa5c95",
      Name: "Acacia Plank",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Chopping",
      Recipe: [
        {
          "Item Name": "Acacia Timber",
          Amount: 5,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529761",
        ID: 4680,
        "Last Update Attempt": "2020-08-27T01:58:04.769Z",
        "Last Updated": "2020-08-27T01:58:04.769Z",
        "Market Price": 4430,
        Name: "Acacia Plank",
        Quantity: 27779,
        "Total Trade Count": 41079543,
      },
      depth: 1,
    },
    {
      _id: "5f3631bd17d0de0f34da87f7",
      Name: "Bloody Tree Knot",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529775",
        ID: 5005,
        "Last Update Attempt": "2020-08-27T01:58:04.763Z",
        "Last Updated": "2020-08-27T01:58:04.763Z",
        "Market Price": 3850,
        Name: "Bloody Tree Knot",
        Quantity: 389329,
        "Total Trade Count": 88402568,
      },
      depth: 1,
    },
    {
      _id: "5f31d2281fa0c3db4623a10a",
      Name: "Apprentice's Alchemy Box",
      "Min Produced": 1,
      "Max Produced": null,
      "Quantity Produced": 1,
      "Time to Produce": 6,
      Action: "Imperial Alchemy Packaging",
      Recipe: [
        {
          "Item Name": "Clear Liquid Reagent",
          Amount: 20,
        },
        {
          "Item Name": "Pure Powder Reagent",
          Amount: 20,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529767",
        "Last Update Attempt": "2020-08-10T18:55:02.195Z",
        "Last Updated": "2020-03-25T18:12:54.378Z",
        "Market Price": 180000,
        Name: "Apprentice's Alchemy Box",
      },
      depth: 2,
    },
    {
      _id: "5f36115282d3cdbd58fa5c96",
      Name: "Acacia Plywood",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Chopping",
      Recipe: [
        {
          "Item Name": "Acacia Plank",
          Amount: 10,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529762",
        ID: 4681,
        "Last Update Attempt": "2020-08-27T01:58:04.769Z",
        "Last Updated": "2020-08-27T01:58:04.769Z",
        "Market Price": 16100,
        Name: "Acacia Plywood",
        Quantity: 8032,
        "Total Trade Count": 55427127,
      },
      depth: 0,
    },
    {
      _id: "5f35c46485ccdb8cadac761c",
      Name: "Acacia Plywood",
      "Min Produced": 3,
      "Max Produced": 3,
      "Quantity Produced": 3,
      "Time to Produce": 1800,
      Action: "Wood Workbench",
      Recipe: [
        {
          "Item Name": "Acacia Plank",
          Amount: 30,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529762",
        ID: 4681,
        "Last Update Attempt": "2020-08-27T01:58:04.769Z",
        "Last Updated": "2020-08-27T01:58:04.769Z",
        "Market Price": 16100,
        Name: "Acacia Plywood",
        Quantity: 8032,
        "Total Trade Count": 55427127,
      },
      depth: 0,
    },
    {
      _id: "5f3631bd17d0de0f34da8791",
      Name: "Bag of Muddy Water",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f3221421c66ada0d2b2ab6b",
        ID: 6657,
        "Last Update Attempt": "2020-08-27T01:58:04.770Z",
        "Last Updated": "2020-08-27T01:58:04.770Z",
        "Market Price": 1660,
        Name: "Bag of Muddy Water",
        Quantity: 43145,
        "Total Trade Count": 135978931,
      },
      depth: 3,
    },
    {
      _id: "5f35c46485ccdb8cadac761d",
      Name: "Acacia Plywood",
      "Min Produced": 5,
      "Max Produced": 5,
      "Quantity Produced": 5,
      "Time to Produce": 3000,
      Action: "Wood Workbench",
      Recipe: [
        {
          "Item Name": "Acacia Plank",
          Amount: 50,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529762",
        ID: 4681,
        "Last Update Attempt": "2020-08-27T01:58:04.769Z",
        "Last Updated": "2020-08-27T01:58:04.769Z",
        "Market Price": 16100,
        Name: "Acacia Plywood",
        Quantity: 8032,
        "Total Trade Count": 55427127,
      },
      depth: 0,
    },
    {
      _id: "5f3631bd17d0de0f34da8669",
      Name: "Bottle of River Water",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529777",
        "Last Update Attempt": "2020-08-10T18:55:02.197Z",
        "Last Updated": "2020-03-25T18:13:01.878Z",
        "Market Price": 6200,
        Name: "Bottle of River Water",
      },
      depth: 3,
    },
    {
      _id: "5f34e467c6e4a0dce68eb988",
      Name: "Plywood Hardener",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Alchemy",
      Recipe: [
        {
          "Item Name": "Pure Powder Reagent",
          Amount: 1,
        },
        {
          "Item Name": "Bloody Tree Knot",
          Amount: 3,
        },
        {
          "Item Name": "Fir Sap",
          Amount: 4,
        },
        {
          "Item Name": "Trace of the Earth",
          Amount: 3,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297ce",
        ID: 4684,
        "Last Update Attempt": "2020-08-27T01:58:04.764Z",
        "Last Updated": "2020-08-27T01:58:04.764Z",
        "Market Price": 279000,
        Name: "Plywood Hardener",
        Quantity: 9740,
        "Total Trade Count": 5401808,
      },
      depth: 0,
    },
    {
      _id: "5f3631bd17d0de0f34da8796",
      Name: "Trace of the Earth",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529810",
        "Last Update Attempt": "2020-08-10T17:53:29.991Z",
        "Last Updated": "2020-03-25T18:14:15.335Z",
        "Market Price": 77000,
        Name: "Trace of the Earth",
      },
      depth: 1,
    },
    {
      _id: "5f3631bd17d0de0f34da8848",
      Name: "Acacia Timber",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529763",
        ID: 4609,
        "Last Update Attempt": "2020-08-27T01:58:04.767Z",
        "Last Updated": "2020-08-27T01:58:04.767Z",
        "Market Price": 1890,
        Name: "Acacia Timber",
        Quantity: 45695,
        "Total Trade Count": 278315972,
      },
      depth: 2,
    },
    {
      _id: "5f36115582d3cdbd58fa5d79",
      Name: "Purified Water",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Filtering",
      Recipe: [
        {
          "Item Name": "Cactus Sap",
          Amount: 5,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297db",
        ID: 6656,
        "Last Update Attempt": "2020-08-27T01:58:04.765Z",
        "Last Updated": "2020-08-27T01:58:04.765Z",
        "Market Price": 3820,
        Name: "Purified Water",
        Quantity: 54866,
        "Total Trade Count": 394310392,
      },
      depth: 2,
    },
    {
      _id: "5f34e467c6e4a0dce68eb989",
      Name: "Pure Powder Reagent",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Alchemy",
      Recipe: [
        {
          "Item Name": "Wild Grass",
          Amount: 1,
        },
        {
          "Item Name": "Silver Azalea",
          Amount: 1,
        },
        {
          "Item Name": "Sugar",
          Amount: 1,
        },
        {
          "Item Name": "Purified Water",
          Amount: 1,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297d8",
        ID: 5302,
        "Last Update Attempt": "2020-08-27T01:58:04.763Z",
        "Last Updated": "2020-08-27T01:58:04.763Z",
        "Market Price": 3210,
        Name: "Pure Powder Reagent",
        Quantity: 89558,
        "Total Trade Count": 102060524,
      },
      depth: 1,
    },
    {
      _id: "5f3631bd17d0de0f34da8619",
      Name: "Wild Grass",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc52981e",
        ID: 5439,
        "Last Update Attempt": "2020-08-27T01:58:04.769Z",
        "Last Updated": "2020-08-27T01:58:04.769Z",
        "Market Price": 945,
        Name: "Wild Grass",
        Quantity: 145971,
        "Total Trade Count": 150377846,
      },
      depth: 2,
    },
    {
      _id: "5f3631bd17d0de0f34da87cf",
      Name: "Cactus Sap",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f31fd831c66ada0d2ab4d71",
        ID: 5016,
        "Last Update Attempt": "2020-08-27T01:58:04.770Z",
        "Last Updated": "2020-08-27T01:58:04.770Z",
        "Market Price": 1120,
        Name: "Cactus Sap",
        Quantity: 2911,
        "Total Trade Count": 2039783,
      },
      depth: 3,
    },
    {
      _id: "5f35c46485ccdb8cadac761b",
      Name: "Acacia Plywood",
      "Min Produced": 1,
      "Max Produced": 1,
      "Quantity Produced": 1,
      "Time to Produce": 720,
      Action: "Wood Workbench",
      Recipe: [
        {
          "Item Name": "Acacia Plank",
          Amount: 10,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529762",
        ID: 4681,
        "Last Update Attempt": "2020-08-27T01:58:04.769Z",
        "Last Updated": "2020-08-27T01:58:04.769Z",
        "Market Price": 16100,
        Name: "Acacia Plywood",
        Quantity: 8032,
        "Total Trade Count": 55427127,
      },
      depth: 0,
    },
    {
      _id: "5f3631bd17d0de0f34da8955",
      Name: "Silver Azalea",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297eb",
        ID: 5402,
        "Last Update Attempt": "2020-08-27T01:58:04.771Z",
        "Last Updated": "2020-08-27T01:58:04.771Z",
        "Market Price": 217,
        Name: "Silver Azalea",
        Quantity: 1291238,
        "Total Trade Count": 419992646,
      },
      depth: 2,
    },
    {
      _id: "5f34e467c6e4a0dce68eb901",
      Name: "Clear Liquid Reagent",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Alchemy",
      Recipe: [
        {
          "Item Name": "Wild Grass",
          Amount: 1,
        },
        {
          "Item Name": "Sunrise Herb",
          Amount: 1,
        },
        {
          "Item Name": "Salt",
          Amount: 1,
        },
        {
          "Item Name": "Purified Water",
          Amount: 1,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc52977d",
        ID: 5301,
        "Last Update Attempt": "2020-08-27T01:58:04.762Z",
        "Last Updated": "2020-08-27T01:58:04.762Z",
        "Market Price": 2920,
        Name: "Clear Liquid Reagent",
        Quantity: 19343,
        "Total Trade Count": 152636518,
      },
      depth: 3,
    },
    {
      _id: "5f3631bd17d0de0f34da86b2",
      Name: "Bottle of Sea Water",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529778",
        ID: 6652,
        "Last Update Attempt": "2020-08-27T01:58:04.774Z",
        "Last Updated": "2020-08-27T01:58:04.774Z",
        "Market Price": 3080,
        Name: "Bottle of Sea Water",
        Quantity: 13681,
        "Total Trade Count": 10200835,
      },
      depth: 5,
    },
    {
      _id: "5f31d2281fa0c3db4623a12f",
      Name: "Pure Powder Reagent",
      "Min Produced": 16,
      "Max Produced": null,
      "Quantity Produced": 16,
      "Time to Produce": 6,
      Action: "Imperial Alchemy Packaging",
      Recipe: [
        {
          "Item Name": "Apprentice's Alchemy Box",
          Amount: 1,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297d8",
        ID: 5302,
        "Last Update Attempt": "2020-08-27T01:58:04.763Z",
        "Last Updated": "2020-08-27T01:58:04.763Z",
        "Market Price": 3210,
        Name: "Pure Powder Reagent",
        Quantity: 89558,
        "Total Trade Count": 102060524,
      },
      depth: 1,
    },
    {
      _id: "5f3631bd17d0de0f34da8820",
      Name: "Sugar",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297ff",
        "Last Update Attempt": "2020-08-10T18:55:02.196Z",
        "Last Updated": "2020-03-04T15:27:47.715Z",
        "Market Price": 20,
        Name: "Sugar",
      },
      depth: 2,
    },
    {
      _id: "5f31d2281fa0c3db4623a130",
      Name: "Clear Liquid Reagent",
      "Min Produced": 16,
      "Max Produced": null,
      "Quantity Produced": 16,
      "Time to Produce": 6,
      Action: "Imperial Alchemy Packaging",
      Recipe: [
        {
          "Item Name": "Apprentice's Alchemy Box",
          Amount: 1,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc52977d",
        ID: 5301,
        "Last Update Attempt": "2020-08-27T01:58:04.762Z",
        "Last Updated": "2020-08-27T01:58:04.762Z",
        "Market Price": 2920,
        Name: "Clear Liquid Reagent",
        Quantity: 19343,
        "Total Trade Count": 152636518,
      },
      depth: 3,
    },
    {
      _id: "5f3631bd17d0de0f34da8859",
      Name: "Sunrise Herb",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529800",
        ID: 5401,
        "Last Update Attempt": "2020-08-27T01:58:04.777Z",
        "Last Updated": "2020-08-27T01:58:04.777Z",
        "Market Price": 189,
        Name: "Sunrise Herb",
        Quantity: 379011,
        "Total Trade Count": 264497894,
      },
      depth: 4,
    },
    {
      _id: "5f36115582d3cdbd58fa5d78",
      Name: "Purified Water",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Filtering",
      Recipe: [
        {
          "Item Name": "Bag of Muddy Water",
          Amount: 5,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297db",
        ID: 6656,
        "Last Update Attempt": "2020-08-27T01:58:04.765Z",
        "Last Updated": "2020-08-27T01:58:04.765Z",
        "Market Price": 3820,
        Name: "Purified Water",
        Quantity: 54866,
        "Total Trade Count": 394310392,
      },
      depth: 2,
    },
    {
      _id: "5f31d21326a2b936d5b31510",
      Name: "Salt",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Heating",
      Recipe: [
        {
          "Item Name": "Bottle of Sea Water",
          Amount: 1,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297e0",
        "Last Update Attempt": "2020-08-10T18:55:02.196Z",
        "Last Updated": "2020-03-25T23:12:57.535Z",
        "Market Price": 20,
        Name: "Salt",
      },
      depth: 4,
    },
    {
      _id: "5f36115582d3cdbd58fa5d77",
      Name: "Purified Water",
      "Min Produced": 1,
      "Max Produced": 4,
      "Quantity Produced": 2.5,
      "Time to Produce": 6,
      Action: "Filtering",
      Recipe: [
        {
          "Item Name": "Bottle of River Water",
          Amount: 1,
        },
      ],
      "Market Data": {
        _id: "5f15dac7cea9de4bcc5297db",
        ID: 6656,
        "Last Update Attempt": "2020-08-27T01:58:04.765Z",
        "Last Updated": "2020-08-27T01:58:04.765Z",
        "Market Price": 3820,
        Name: "Purified Water",
        Quantity: 54866,
        "Total Trade Count": 394310392,
      },
      depth: 2,
    },
    {
      _id: "5f3631bd17d0de0f34da890b",
      Name: "Fir Sap",
      Action: "Gather/Purchase",
      "Market Data": {
        _id: "5f15dac7cea9de4bcc529790",
        ID: 5009,
        "Last Update Attempt": "2020-08-27T01:58:04.778Z",
        "Last Updated": "2020-08-27T01:58:04.778Z",
        "Market Price": 1110,
        Name: "Fir Sap",
        Quantity: 29024,
        "Total Trade Count": 208326704,
      },
      depth: 1,
    },
  ],
};

// Build mapping
function buildTreeMapping(data) {
  const itemMapping = {};
  itemMapping[data.Name] = data;
  for (const ingredient of data.Ingredients) {
    itemMapping[ingredient.Name] = ingredient;
  }
  return itemMapping;
}

// Build tree
function buildTree(item, itemMapping = {}, alreadySeen = {}) {
  if (alreadySeen[item.Name]) return null;
  alreadySeen[item.Name] = true;

  let tree = { ...item };
  tree["isOpen"] = true;
  if (item.Recipe) {
    tree["children"] = item.Recipe.map((ingredient) => {
      const name = ingredient["Item Name"];
      return buildTree(itemMapping[name], itemMapping, { ...alreadySeen });
    }).filter((elem) => {
      return elem != null;
    });
  }
  return tree;
}

export function stackedBar(items = [], barHeight) {
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
        y += barHeight;
      }

      recursiveReset(item.children, barHeight, x);
      x += item.value || 0;
      // y = y2;
    }
    // return [x, y];
  };

  recursiveReset(items, barHeight, 0);
}

export function convertToTree(data) {
  // Use methods
  // console.log("[Convert to Tree] Tree data", data);

  const treeData = buildTree(data, buildTreeMapping(data));
  let root: any = d3.hierarchy(treeData);
  root.sum(function (d) {
    return d.isOpen ? d["Time to Produce"] : 0; // time spent to craft this item
  });
  stackedBar([root], 55);

  // console.log("d3 stacked bar tree:", root);
  return root;
}

const root = convertToTree(sampleData);
export default root;
