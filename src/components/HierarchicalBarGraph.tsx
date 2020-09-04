import React, { useState, useMemo } from "react";
// import "../scss/HierarchicalBarGraph.scss";
import { useSpring, animated } from "react-spring";

const Bar = (props) => {
  const { root, barHeight, xScale, onBarClick, isVisible } = props;

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
    height: isVisible ? `calc(100% - ${root.data.y}px)` : barHeight + 10, // `calc(100%-${root.data.y} + 100)`
    // fill: "red",
    opacity: isVisible ? 0.05 : 0,
  });

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
  const { root, width, height, barHeight, xScale, updateGraph } = props;
  console.log("DESCENDANTS", root.descendants());
  const descendants = root.descendants();
  const [activeNode, setActiveNode] = useState(root);

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
