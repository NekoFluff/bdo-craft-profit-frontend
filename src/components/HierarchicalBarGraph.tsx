import React, { useState, useMemo } from "react";
import * as d3 from "d3";
// import "../scss/HierarchicalBarGraph.scss";
import { useSprings, useSpring, animated } from "react-spring";

const Bar = (props) => {
  const { root, x, y, barHeight, xScale, onBarClick, index, isVisible } = props;

  const translation = `translate(${x},${y})`;
  const spring = useSpring({
    width: isVisible ? xScale(root.value) : 0,
  });

  // const value =
  //   storedRoot.children == null
  //     ? 0
  //     : storedRoot.children.reduce(
  //         (accumulator, node) => accumulator + node.value
  //       );

  return (
    <g
      className={`bar-graph__bar-group ${isVisible ? "enter" : "exit"}`}
      transform={translation}
    >
      <animated.rect
        {...spring}
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
          onBarClick(index);
        }}
      >{`${root.data.Name}: ${isVisible ? root.value : 0}`}</text>
    </g>
  );
};

const ItemGroup = (props) => {
  const {
    nodes = [],
    startX,
    barHeight,
    xScale,
    childrenVisible = true,
    updateRootValues,
    updateParent = () => {},
  } = props;
  const [storedNodes, setStoredNodes] = useState(nodes);
  const [springs, setSprings] = useSprings(
    storedNodes.length,
    ((width, height) => (index) => {
      const node = storedNodes[index];
      let previousWidth = width; // Starting X position before recursively adding bars
      let previousHeight = height; // Starting Y position before recursively adding bars

      width += xScale(node.value);
      if (childrenVisible && node.children)
        height += node.descendants().length * barHeight;
      else height += barHeight;

      const translation = `translate(${startX},${previousHeight + barHeight})`;

      return {
        opacity: 1,
        transform: translation,
      };
    })(0, 0)
  );

  if (nodes.length == 0) return null;

  const mapRender = ((width, height) => (props, index) => {
    const node = storedNodes[index];
    let previousWidth = width; // Starting X position before recursively adding bars
    let previousHeight = height; // Starting Y position before recursively adding bars

    width += xScale(node.value);
    if (node.children) height += node.descendants().length * barHeight;
    else height += barHeight;

    return (
      <animated.g
        className="bar-graph__item-group"
        {...props}
        // transform={translation}
      >
        {/* <rect rx={3} height={"100%"} width={"100%"} fill-opacity="7%"></rect> */}
        <rect
          className="bar-graph__shadow"
          x={previousWidth}
          rx={3}
          height={`calc(${height - (previousHeight + barHeight)})`}
          width={xScale(node.value)}
          fill-opacity="10%"
        ></rect>
        <Bar
          isVisible={node.data.isOpen && childrenVisible}
          index={index}
          root={node}
          x={previousWidth}
          y={0}
          barHeight={barHeight}
          xScale={xScale}
          onBarClick={(selectedIndex) => {
            const newNodeList = [...storedNodes];
            // console.log("New Node List", selectedIndex, newNodeList);
            newNodeList[selectedIndex].data.isOpen = !newNodeList[selectedIndex]
              .data.isOpen;
            let total = 0;
            if (newNodeList[index].children != null)
              for (const child of newNodeList[index].children) {
                total += child.value || 0;
              }
            total += newNodeList[index].data["Time to Produce"] || 0;
            // total += newNodeList[selectedIndex].data["Time to Produce"] || 0;
            for (const d of newNodeList[selectedIndex].descendants()) {
              d.data.isOpen = newNodeList[selectedIndex].data.isOpen;
            }
            newNodeList[selectedIndex].value = newNodeList[selectedIndex].data
              .isOpen
              ? total
              : 0;
            setStoredNodes(newNodeList);
            const translation = newNodeList[selectedIndex].data.isOpen
              ? `translate(${startX},${previousHeight + barHeight})`
              : `translate(${startX}, ${0})`;

            const closedHeight = newNodeList[selectedIndex].data.isOpen
              ? 0
              : newNodeList[selectedIndex].height - 2 * barHeight;

            const translation2 = newNodeList[selectedIndex].data.isOpen
              ? `translate(${startX},${
                  previousHeight +
                  barHeight +
                  newNodeList[selectedIndex].descendants().length * 50
                })`
              : `translate(${startX},${previousHeight + barHeight})`;

            const fn: any = (nodeIndex) => {
              if (selectedIndex == nodeIndex)
                return {
                  fill: newNodeList[selectedIndex].data.isOpen
                    ? "purple"
                    : "red",
                  opacity: newNodeList[selectedIndex].data.isOpen ? 1 : 0.5,
                  transform: translation,
                };
              // else
              //   return {
              //     transform: translation2,
              //   };
            };
            setSprings(fn);
            console.log("IS OPEN?", node.data.isOpen);
            updateRootValues();
            updateParent();
          }}
        ></Bar>
        <ItemGroup
          childrenVisible={node.data.isOpen && childrenVisible}
          nodes={node.children}
          startX={previousWidth}
          barHeight={barHeight}
          xScale={xScale}
          updateRootValues={updateRootValues}
          updateParent={() => {
            const newNodeList = [...storedNodes];
            let total = 0;
            if (newNodeList[index].children != null)
              for (const child of newNodeList[index].children) {
                total += child.value || 0;
              }
            total += newNodeList[index].data["Time to Produce"] || 0;
            newNodeList[index].value = newNodeList[index].data.isOpen
              ? total
              : 0;
            setStoredNodes(newNodeList);
            updateParent();
          }}
        ></ItemGroup>
        )
      </animated.g>
    );
  })(0, 0);

  return <>{springs.map((props, i) => mapRender(props, i))}</>;
};

const HierarchicalBarGraph = (props) => {
  const { root, width, height, barHeight } = props;
  const [myNumber, setNumber] = useState(10);

  const xScale = useMemo(
    () => d3.scaleLinear().domain([0, root.value]).range([0, width]),
    [myNumber]
  );
  // const xScale = d3.scaleLinear().domain([0, root.value]).range([0, width]);

  // console.log(root);
  const updateRootValues = () => {
    // root.sum(function (d) {
    //   return d.isOpen ? d["Time to Produce"] : 0; // time spent to craft this item
    //   // return d.isOpen ? 5 : 0; // time spent to craft this item
    // });
    // root.value = 100;
    setNumber(root.value);
  };

  if (!root.data.isOpen) console.log("Empty Root");
  //return null;
  else
    return (
      <ItemGroup
        className="bar-graph"
        nodes={[root]}
        startX={0}
        startY={0}
        barHeight={barHeight}
        xScale={xScale}
        childrenVisible={true}
        updateRootValues={updateRootValues}
      ></ItemGroup>
    );
};

export default HierarchicalBarGraph;
