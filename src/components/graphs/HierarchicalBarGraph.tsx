import * as d3 from "d3";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";

import { convertToTree, stackedBar } from "../../helpers/parseItemFromRedux";
import { RootState } from "../../store/reducer";
import Axis from "./Axis";

const Bar = (props) => {
  const buyColor = "#BD1A13FF";
  const craftColor = "#4F4F4FFF";
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
    paddingLeft,
  } = props;
  const color = root.data.action === "Buy" ? buyColor : craftColor;

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
    fill: color,
  });

  const shadowSpring = useSpring({
    width: xScale(root.value),

    height: isVisible ? boundedHeight - root.data.y : barHeight + 10,
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
      {/* <animated.rect
        {...shadowSpring}
        className={`bar-graph__bar-shadow`}
        rx="3"
      /> */}

      {/* VISIBLE BAR */}
      <animated.rect
        {...barSpring}
        className={`bar-graph__bar ${isVisible ? "enter" : "exit"}`}
        height={barHeight}
        rx="3"
      />

      {/* BAR GRAPH TEXT */}
      <text
        className="bar-graph__text"
        fontSize="1.2em"
        fontFamily="Bebas Neue"
        textAnchor="end"
        // textLength="15%"
        x={-xScale(root.data.x) - 5}
        y={barHeight}
        stroke={color}
        fill={color}
        // onClick={(e) => {
        //   onBarClick();
        // }}
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

      {/* INVISIBLE BAR (HOVER) */}
      <animated.rect
        className={`bar-graph__bar ${isVisible ? "enter" : "exit"}`}
        height={barHeight}
        width={maxWidth + paddingLeft}
        x={-xScale(root.data.x) - paddingLeft}
        rx="3"
        opacity={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </animated.g>
  );
};

const HierarchicalBarGraph = (props) => {
  const { dimensions, setValues } = props;
  const { boundedWidth: width, boundedHeight: height } = dimensions;
  const barHeight = 15;
  const barPadding = 20;
  const verticalOffset = 30; // To move chart below Axis
  const actualWidth = width - parseFloat(dimensions.paddingLeft);

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
        root.descendants().length * (barHeight + barPadding) +
          verticalOffset +
          50
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
      return d3.scaleLinear().domain([0, 1]).range([0, actualWidth]);
    return d3.scaleLinear().domain([0, root.value]).range([0, actualWidth]);
  };

  let xScale = calculateXScale();

  const updateGraph = () => {
    if (root === null) return null;
    setValues(root);
    xScale = calculateXScale();
    stackedBar([root], barHeight, barPadding);
  };

  updateGraph();

  //   <g
  //   transform={`translate(${[
  //     dimensions.marginLeft,
  //     parseFloat(dimensions.marginTop) + 20,
  //   ].join(",")})`}
  // >
  //   {/* TODO: Remove this lavender rectangle later. */}
  //   <rect
  //     width={dimensions.boundedWidth}
  //     height={dimensions.boundedHeight}
  //     fill="lavender"
  //   />
  // </g>

  const getParent = (path) => {
    const temp = path.split("/");
    if (temp.length > 2) {
      return temp[temp.length - 2];
    } else {
      return null;
    }
  };

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
          <Axis domain={[0, root.value]} range={[0, actualWidth]} />
          <g transform={`translate(0, ${verticalOffset})`}>
            {descendants.map((node, index) => {
              return (
                <Bar
                  boundedHeight={height - 40}
                  key={index}
                  isVisible={node.data.isOpen}
                  root={node}
                  barHeight={barHeight}
                  maxWidth={actualWidth}
                  xScale={xScale}
                  paddingLeft={parseFloat(dimensions.paddingLeft)}
                  onMouseEnter={() => {
                    const location = [node.data.x, node.data.y];
                    console.log("NODE DATA", node.data);
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
                      examples: [getParent(node.data.path)],
                      shoppingCartData:
                        node.data.shoppingCartData[node.data.path],
                      action: node.data.recipes[node.data.activeRecipeId]
                        ? node.data.recipes[node.data.activeRecipeId].action
                        : "",
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
