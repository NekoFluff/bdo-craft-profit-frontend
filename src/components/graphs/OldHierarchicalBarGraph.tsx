import React, { useState, useMemo } from "react";
// import "../scss/HierarchicalBarGraph.scss";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import { convertToTree } from "../../helpers/parseItemFromRedux";
import { stackedBar } from "../../helpers/parseItemFromRedux";
import * as d3 from "d3";

const Bar = (props) => {
  const {
    root,
    barHeight,
    xScale,
    onBarClick,
    isVisible,
    boundedHeight,
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
    width: isVisible ? xScale(root.value) : 0,
    fill: isVisible ? (root.data.action === "Buy" ? "green" : "purple") : "red",
  });

  const shadowSpring = useSpring({
    width: isVisible ? xScale(root.value) : 0,
    height: isVisible
      ? `calc(${boundedHeight}px - ${root.data.y}px)`
      : barHeight + 10, // `calc(100%-${root.data.y} + 100)`
    // fill: "red",
    opacity: isVisible ? 0.05 : 0,
  });

  console.log("TEST X Y:", root.data.x, root.data.y, xScale(root.data.x));

  return (
    <animated.g
      className={`bar-graph__bar-group ${isVisible ? "enter" : "exit"}`}
      {...positionSpring}
    >
      <animated.rect
        {...barSpring}
        className={`bar-graph__bar ${isVisible ? "enter" : "exit"}`}
        height={barHeight / 2}
        rx="3"
      />

      <animated.rect
        {...shadowSpring}
        className={`bar-graph__bar-shadow`}
        rx="3"
      />
      <text
        className="bar-graph__text"
        x={0}
        y={-2}
        fontSize="1.25em"
        fontFamily="Bebas Neue"
        // fill="red"
        onClick={(e) => {
          onBarClick();
        }}
      >{`${root.data.name}: ${isVisible ? root.value : 0}`}</text>
    </animated.g>
  );
};

const HierarchicalBarGraph = (props) => {
  const { width, height, setValues } = props;

  // Hooks - Items
  const items = useSelector((state: RootState) => state.entities.items.data);
  const rootItem = useSelector(
    (state: RootState) =>
      state.entities.items.data[state.entities.items.rootItem]
  );

  // Generate the graph
  const root = useMemo(() => {
    return convertToTree(rootItem, items);
  }, [rootItem, items]);

  // Hooks - root
  const [activeNode, setActiveNode] = useState(root);

  if (root === null) return null;

  // Conditional return
  const descendants = root.descendants();
  const barHeight = root ? height / descendants.length : 50;

  // Hooks - xScale
  const calculateXScale = () => {
    if (root == null) return d3.scaleLinear().domain([0, 1]).range([0, width]);
    console.log("TEST ROOT VALUE", root.value, root);
    return d3.scaleLinear().domain([0, root.value]).range([0, width]);
  };

  let xScale = calculateXScale();

  const updateGraph = () => {
    if (root === null) return null;
    setValues(root);
    xScale = calculateXScale();
    stackedBar([root], barHeight);
    console.log("TEST SET VALUES", root, barHeight, xScale(100));
  };

  updateGraph();

  if (!root.data.isOpen) console.log("Empty Root");
  else
    return (
      <>
        {descendants.map((node, index) => {
          return (
            <Bar
              boundedHeight={height}
              key={index}
              isVisible={node.data.isOpen}
              root={node}
              barHeight={barHeight}
              xScale={xScale}
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
      </>
    );
};

export default HierarchicalBarGraph;
