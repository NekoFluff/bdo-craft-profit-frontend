import React, { useState, useMemo } from "react";
import * as d3 from "d3";
// import "../scss/HierarchicalBarGraph.scss";
import { useSprings, useSpring, animated } from "react-spring";
import { resetPositions } from "../helpers/parseItem";

const Bar = (props) => {
  const { root, barHeight, xScale, onBarClick, isVisible } = props;

  const barSpring = useSpring({
    width: isVisible ? xScale(root.value + 1) : 0,
    fill: isVisible ? "purple" : "red",
  });

  const positionSpring = useSpring({
    transform: isVisible
      ? `translate(${xScale(root.data.x)},${root.data.y})`
      : `translate(${xScale(root.data.x)},${0})`,
    opacity: isVisible ? 1 : 0,
  });

  return (
    <animated.g
      className={`bar-graph__bar-group ${isVisible ? "enter" : "exit"}`}
      {...positionSpring}
    >
      <animated.rect
        {...barSpring}
        className={`bar-graph__bar ${isVisible ? "enter" : "exit"}`}
        // width={xScale(root.value)}
        height={barHeight / 2}
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
      >{`${root.data.Name}: ${isVisible ? root.value : 0}`}</text>
    </animated.g>
  );
};

const HierarchicalBarGraph = (props) => {
  const { root, width, height, barHeight } = props;
  console.log("DESCENDANTS", root.descendants());
  const descendants = root.descendants();
  const [activeNode, setActiveNode] = useState(root);

  // Hooks
  const [rootValue, setRootValue] = useState(10);
  const xScale = useMemo(
    () => d3.scaleLinear().domain([0, root.value]).range([0, width]),
    [rootValue]
  );

  // console.log(root);
  const updateRootValues = () => {
    // Recalculate values
    root.sum(function (d) {
      return d.isOpen ? d["Time to Produce"] : 0; // time spent to craft this item
    });

    // Update x and y positions
    resetPositions([descendants[0]], 55);

    // then update scale
    setRootValue(root.value);
  };

  if (!root.data.isOpen) console.log("Empty Root");
  //return null;
  else
    return (
      <>
        {descendants.map((node, index) => {
          return (
            <Bar
              // animationProps={props}
              key={index}
              isVisible={node.data.isOpen}
              root={node}
              barHeight={barHeight}
              xScale={xScale}
              onBarClick={() => {
                // console.log("New Node List", selectedIndex, newNodeList);

                // Update 'isOpen' variable of all descendants
                node.data.isOpen = !node.data.isOpen;

                console.log("IsOpen:", node.data.isOpen);

                for (const d of node.descendants()) {
                  d.data.isOpen = node.data.isOpen;
                }

                updateRootValues();
                setActiveNode(node);
              }}
            ></Bar>
          );
        })}
      </>
    );
};

export default HierarchicalBarGraph;
