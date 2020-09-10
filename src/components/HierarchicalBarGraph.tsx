import React, { useState, useMemo } from "react";
// import "../scss/HierarchicalBarGraph.scss";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { convertToTree } from "../helpers/parseItemFromRedux";
import { stackedBar } from "../helpers/parseItemFromRedux";
import * as d3 from "d3";
import Axis from "./Charts/Axis";

const Bar = (props) => {
  const {
    root,
    barHeight,
    xScale,
    onBarClick,
    isVisible,
    boundedHeight,
    onMouseEnter,
    onMouseLeave,
    maxWidth,
  } = props;

  const positionSpring = useSpring({
    // config: {
    //   duration: 10000,
    // },
    transform: isVisible
      ? `translate(${xScale(root.data.x)},${root.data.y})`
      : `translate(${xScale(root.data.x)},${0})`,
    opacity: isVisible ? 1 : 0,
  });

  const barSpring = useSpring({
    width: xScale(root.value),
    fill: isVisible ? (root.data.action === "Buy" ? "green" : "purple") : "red",
  });

  const shadowSpring = useSpring({
    width: xScale(root.value),
    height: isVisible
      ? `calc(${boundedHeight}px - ${root.data.y}px)`
      : barHeight + 10, // `calc(100%-${root.data.y} + 100)`
    // fill: "red",
    opacity: isVisible ? 0.09 : 0,
  });

  const lineFunction: any = d3
    .line()
    .x((d: any) => d.x)
    .y((d: any) => d.y);

  return (
    <animated.g
      className={`bar-graph__bar-group ${isVisible ? "enter" : "exit"}`}
      {...positionSpring}
    >
      {/* SHADOW */}
      <animated.rect
        {...shadowSpring}
        className={`bar-graph__bar-shadow`}
        rx="3"
      />

      {/* VISIBLE BAR */}
      <animated.rect
        {...barSpring}
        className={`bar-graph__bar ${isVisible ? "enter" : "exit"}`}
        height={barHeight}
        rx="3"
      />

      {/* INVISIBLE BAR (HOVER) */}
      <animated.rect
        className={`bar-graph__bar ${isVisible ? "enter" : "exit"}`}
        height={barHeight}
        width={maxWidth}
        x={-xScale(root.data.x)}
        rx="3"
        opacity={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* <rect
        x={-xScale(root.data.x)}
        y={barHeight}
        width="250px"
        height="15px"
        fill="blue"
      ></rect> */}

      {/* BAR GRAPH TEXT */}
      <text
        className="bar-graph__text"
        fontSize="1.2em"
        fontFamily="Bebas Neue"
        textAnchor="end"
        // textLength="15%"
        x={-xScale(root.data.x) - 5}
        y={barHeight}
        // fill="red"
        onClick={(e) => {
          onBarClick();
        }}
      >{`${root.data.name}`}</text>

      {/* LINE BETWEEN TEXT AND BAR */}
      <path
        stroke="black"
        opacity="1"
        d={lineFunction([
          { x: -xScale(root.data.x), y: barHeight / 2 },
          { x: 0, y: barHeight / 2 },
        ])}
      ></path>
      {/* : ${isVisible ? root.value : 0} */}
    </animated.g>
  );
};

const HierarchicalBarGraph = (props) => {
  const { dimensions, setValues } = props;
  const { boundedWidth: width, boundedHeight: height } = dimensions;
  const barHeight = 15;
  const padding = 20;
  const verticalOffset = 30; // To move chart below Axis

  // Hooks - Items
  const items = useSelector((state: RootState) => state.entities.items.data);
  const rootItem = useSelector(
    (state: RootState) =>
      state.entities.items.data[state.entities.items.rootItem]
  );

  // Generate the graph
  const root = useMemo(() => {
    const root = convertToTree(rootItem, items);
    if (root) {
      props.updateChartHeight(
        root.descendants().length * (barHeight + padding) + verticalOffset
      );
    }
    return root;
  }, [rootItem, items]);

  // Hooks - root
  const [activeNode, setActiveNode] = useState(root);

  // Conditional return
  if (root === null) return null;

  // Get descendants if root is not null
  const descendants = root.descendants();

  // Hooks - xScale
  const calculateXScale = () => {
    if (root == null)
      return d3
        .scaleLinear()
        .domain([0, 1])
        .range([0, width - dimensions.paddingLeft]);
    return d3
      .scaleLinear()
      .domain([0, root.value])
      .range([0, width - dimensions.paddingLeft]);
  };

  let xScale = calculateXScale();

  const updateGraph = () => {
    if (root === null) return null;
    setValues(root);
    xScale = calculateXScale();
    stackedBar([root], barHeight, padding);
  };

  updateGraph();

  if (!root.data.isOpen) console.log("Empty Root");
  else
    return (
      <svg
        transform={`translate(${[
          dimensions.marginLeft,
          parseFloat(dimensions.marginTop) + 20,
        ].join(",")})`}
      >
        {/* <rect width={`${width}`} height="50px"></rect> */}
        <g transform={`translate(${dimensions.paddingLeft}, 0)`}>
          <Axis
            domain={[0, root.value]}
            range={[0, width - dimensions.paddingLeft]}
          />
          <g transform={`translate(0, ${verticalOffset})`}>
            {descendants.map((node, index) => {
              return (
                <Bar
                  boundedHeight={height}
                  key={index}
                  isVisible={node.data.isOpen}
                  root={node}
                  barHeight={barHeight}
                  maxWidth={width - dimensions.paddingLeft}
                  xScale={xScale}
                  onMouseEnter={() => {
                    const location = [node.data.x, node.data.y];

                    props.setPopupData({
                      location: [
                        xScale(location[0] + node.value / 2) +
                          parseFloat(dimensions.marginLeft) +
                          parseFloat(dimensions.paddingLeft),
                        location[1],
                      ],
                      value: node.value,
                      name: node.data.name,
                      maxValue: root.value,
                      // examples: ["Test 1", "Test 2", "Test 3"],
                      examples: Object.keys(node.data.usedInRecipes).map(
                        (fullPath) => {
                          const temp = fullPath.split("/");
                          if (temp.length > 2) {
                            return temp[temp.length - 2];
                          } else {
                            return null;
                          }
                        }
                      ),
                    });
                  }}
                  onMouseLeave={() => {
                    props.hidePopupData();
                  }}
                  onBarClick={() => {
                    // Update 'isOpen' variable of all descendants
                    node.data.isOpen = !node.data.isOpen;

                    console.log("IsOpen:", node.data.isOpen);

                    for (const d of node.descendants()) {
                      d.data.isOpen = node.data.isOpen;
                    }

                    updateGraph();
                    setActiveNode(node);
                  }}
                ></Bar>
              );
            })}
          </g>
        </g>
      </svg>
    );
};

export default HierarchicalBarGraph;
