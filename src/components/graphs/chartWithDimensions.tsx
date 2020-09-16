import React, { useState } from "react";

import useChartDimensions from "../hooks/useChartDimensions";
import ChartPopup, { PopupData } from "./ChartPopup";

const initialPopupData: PopupData = {
  location: [0, 0],
  name: "N/A",
  value: 0,
  maxValue: 0,
  examples: ["Sample Example"],
  shoppingCartData: {},
  action: "N/A",
};

type ChartSettings = {
  width?: string;
  height?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingLeft?: string;
};

function chartWithDimensions(
  Component: any,
  chartSettings: ChartSettings,
  title: string
) {
  return (props) => {
    const { setValues, setValueText } = props;
    // Hooks
    const [ref, dimensions] = useChartDimensions(chartSettings);
    const [popupData, setPopupData] = useState(initialPopupData);
    const [popupHidden, setPopupHidden] = useState(true);
    // const [height, setHeight] = useState(dimensions.height || 900);
    return (
      <div
        className="Chart__wrapper"
        ref={ref}
        style={{ height: dimensions.height, width: dimensions.boundedWidth }}
      >
        <ChartPopup
          data={popupData}
          isHidden={popupHidden}
          topOffset={parseInt(dimensions.marginTop) + 20}
          setValueText={setValueText}
        />

        <svg width={dimensions.width} height={dimensions.height}>
          {/* TODO: Remove this lavender rectangle later. */}
          <g transform={`translate(${[dimensions.marginLeft, 20].join(",")})`}>
            <rect
              width={dimensions.boundedWidth}
              height={
                dimensions.boundedHeight + parseFloat(dimensions.marginTop) + 20
              }
              rx={15}
              fill="white"
            />
          </g>

          <text
            x="50%"
            y={`${parseInt(chartSettings.marginTop || "0")}px`}
            textAnchor="middle"
            fontSize="2em"
            fontFamily="Bebas Neue"
          >
            {title}
          </text>

          <Component
            dimensions={dimensions}
            setValues={setValues}
            setPopupData={(popupData: PopupData) => {
              setPopupHidden(false);
              setPopupData(popupData);
            }}
            hidePopupData={() => {
              setPopupHidden(true);
            }}
            updateChartHeight={(height) => {
              chartSettings.height =
                height +
                parseFloat(dimensions.marginTop) +
                parseFloat(dimensions.marginBottom);
            }}
          />
        </svg>
      </div>
    );
  };
}

export default chartWithDimensions;
