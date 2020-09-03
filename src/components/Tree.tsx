import React, { useState } from "react";
import root from "../helpers/parseItem";
import * as d3 from "d3";

const width = 1000;
const height = 1000;
const treeRoot = d3.tree().size([height, width])(root);
const dx = 0;
const dy = 0;
const marginLeft = 100;
let x0 = Infinity;
let x1 = -Infinity;
console.log("d3 tree:", treeRoot);
treeRoot.each((d: any) => {
  if (d.x > x1) x1 = d.x;
  if (d.x < x0) x0 = d.x;
});

const linkGen = d3
  .linkHorizontal()
  .x((d: any) => d.y)
  .y((d: any) => d.x);

const AnimatedCircles = () => {
  console.log("Tree Size:", x1, x0, dx, dy);
  return (
    <svg viewBox={`0, 0, ${width}, ${x1 - x0 + dx * 2}`}>
      {/* <svg viewBox={`0, 0, 1000, 1000`}> */}
      <g
        font-family="sans-serif"
        font-size="10"
        transform={`translate(${marginLeft},${dx - x0})`}
      >
        {/* Links */}
        <g fill="none" stroke="#555" stoke-opacity="0.4" stroke-width="1.5">
          {root.links().map((datum) => {
            console.log("Datum", datum);
            return <path d={linkGen(datum)}></path>;
          })}
        </g>

        {/* Nodes */}
        <g stroke-linejoin="round" stroke-width="1">
          {root.descendants().map((datum) => {
            return (
              <g transform={`translate(${datum.y},${datum.x})`}>
                <circle fill={datum.children ? "#555" : "#999"} r="2.5" />
                <text
                  // dy="-2em"
                  // fontSize="0.5em"
                  x={datum.children ? -6 : 6}
                  text-anchor={datum.children ? "end" : "start"}
                  stroke="green"
                >
                  {datum.data.Name}
                </text>
              </g>
            );
          })}
        </g>
      </g>

      {/* {allCircles.map((d) => (
        <AnimatedCircle
          key={d}
          index={d}
          isShowing={visibleCircles.includes(d)}
        />
      ))} */}
    </svg>
  );
};
