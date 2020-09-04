import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import useChartDimensions from "./hooks/useChartDimensions";
import HierarchicalBarGraph from "./HierarchicalBarGraph";
import { convertToTree } from "../helpers/parseItemFromRedux";
import { stackedBar } from "../helpers/parseItemFromRedux";
import * as d3 from "d3";

const ChartWithDimensions = (props) => {
  const { setValues } = props;
  const chartSettings = props.chartSettings;
  // Hooks
  const [ref, dms] = useChartDimensions(chartSettings);

  // Hooks - Items
  const items = useSelector((state: RootState) => state.entities.items.data);
  const rootItem = useSelector(
    (state: RootState) =>
      state.entities.items.data[state.entities.items.rootItem]
  );

  // Generate the graph
  const root = convertToTree(rootItem, items);

  const barHeight = root ? dms.boundedHeight / root.descendants().length : 50;
  const updateGraph = () => {
    if (root === null) return;
    setValues(root);
    stackedBar([root], barHeight);
  };

  updateGraph();

  // Hooks - xScale
  const xScale = useMemo(() => {
    if (root == null)
      return d3.scaleLinear().domain([0, 1]).range([0, dms.boundedWidth]);
    return d3
      .scaleLinear()
      .domain([0, root.value])
      .range([0, dms.boundedWidth]);
  }, [rootItem]);

  if (root == null) return <div ref={ref}></div>;

  // console.log("Chart Root", root);
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
          {/* TODO: Remove this lavender rectangle later. */}
          <rect
            width={dms.boundedWidth}
            height={dms.boundedHeight}
            fill="lavender"
          />
          {root != null && (
            <HierarchicalBarGraph
              width={dms.boundedWidth}
              height={dms.boundedHeight}
              root={root}
              barHeight={barHeight}
              xScale={xScale}
              updateGraph={updateGraph}
            />
          )}
        </g>
      </svg>
    </div>
  );
};

export default ChartWithDimensions;
