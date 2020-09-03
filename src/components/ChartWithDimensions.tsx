import React from "react";
import useChartDimensions from "./hooks/useChartDimensions";
import { useMemo } from "react";
import * as d3 from "d3";
import HierarchicalBarGraph from "./HierarchicalBarGraph";
import root from "../helpers/parseItem";

const ChartWithDimensions = (props) => {
  const chartSettings = props.chartSettings;
  const [ref, dms] = useChartDimensions(chartSettings);

  // const xScale = useMemo(
  //   () => d3.scaleLinear().domain([0, 100]).range([0, dms.boundedWidth]),
  //   [dms.boundedWidth]
  // );

  return (
    <div
      className="Chart__wrapper"
      ref={ref}
      style={{ height: dms.height, width: dms.width }}
    >
      <svg width={dms.width} height={dms.height}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(",")})`}
        >
          {/* TODO: REmove this. */}
          <rect
            width={dms.boundedWidth}
            height={dms.boundedHeight}
            fill="lavender"
          />
          <HierarchicalBarGraph
            width={dms.boundedWidth}
            height={dms.boundedHeight}
            root={root}
            barHeight={dms.boundedHeight / root.descendants().length}
          />
        </g>
      </svg>
    </div>
  );
};

export default ChartWithDimensions;
