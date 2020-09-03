import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { useInterval } from "../components/hooks/useInterval";
import _ from "lodash";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
import { linkVertical } from "d3-shape";
import "../scss/ItemCard.scss";

// Animate circles
const AnimatedCircles = () => {
  const [visibleCircles, setVisibleCircles] = useState(pickCirclesRandomly());
  useInterval(() => {
    setVisibleCircles(pickCirclesRandomly());
  }, 2000);

  return (
    <svg viewBox={`0, 0, 100, 100`}>
      {allCircles.map((d) => (
        <AnimatedCircle
          key={d}
          index={d}
          isShowing={visibleCircles.includes(d)}
        />
      ))}
    </svg>
  );
};

export default AnimatedCircles;

type AnimatedCircleProps = {
  index: number;
  isShowing: boolean;
};

const AnimatedCircle: React.FC<AnimatedCircleProps> = ({
  index,
  isShowing,
}) => {
  const [color, setColor] = useState(0);
  const wasShowing = useRef(false);
  useEffect(() => {
    wasShowing.current = isShowing;
  }, [isShowing]);

  const style = useSpring({
    config: {
      duration: 1200,
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0,
  });

  const xOffset = index * 15 + 6;
  const yOffset = 10;
  const arc = d3.arc();
  const data: any = [
    [10, 60],
    [40, 90],
    [60, 10],
    [190, 10],
  ];
  const p = d3
    .line()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(d3.curveCatmullRom.alpha(0.5))(data);
  // var link = d3.linkVertical();
  // const p2 = link(data);
  var link = d3
    .linkVertical()
    .x(function (d) {
      return d[0];
    })
    .y(function (d) {
      return d[1];
    });

  return (
    <g key={index} transform={`translate(${xOffset}, ${yOffset})`}>
      <rect stroke="green" fill="green" x="0" width="5" height="5" rx="1" />
      <text className="small">{index}</text>

      <animated.circle
        {...style}
        cx="0"
        cy="0"
        fill={
          !isShowing
            ? "tomato"
            : !wasShowing.current
            ? "cornflowerblue"
            : "lightgrey"
        }
        onMouseEnter={() => {
          console.log("Mouse entered circle");
        }}
      />
      {/* <path d="M 1 1 H 9 V 9 H 1 Z" fill="transparent" stroke="black" /> */}
      {/* <path
        d={arc({
          innerRadius: 0,
          outerRadius: 10,
          startAngle: 0,
          endAngle: Math.PI / 2,
        })}
        fill="transparent"
        stroke="black"
      /> */}
      {/* <path d={p} fill="transparent" stroke="black" /> */}
      <path
        className="path"
        d={link({
          source: [0, 0],
          target: [50, 50],
        })}
        fill="transparent"
        stroke={color == 1 ? "black" : "red"}
        onMouseEnter={() => {
          console.log("Mouse entered path");
          setColor(0);
        }}
        onMouseLeave={() => {
          setColor(1);
        }}
      />
    </g>
  );
};

const generateAllCircles = () => {
  const dataset = [];
  for (let i = 0; i < 5; i++) {
    dataset.push(i);
  }
  return dataset;
};

const allCircles = generateAllCircles();

const pickCirclesRandomly = () => {
  const dataset = [];
  for (let i = 0; i < 3; i++) {
    dataset.push(_.sample(allCircles));
  }
  return dataset;
};
