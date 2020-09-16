import React from "react";
import { animated, useSpring } from "react-spring";
import numberWithCommas from "../../helpers/numberWithCommas";
import "../../scss/ChartPopup.scss";

export type PopupData = {
  location: [number, number];
  name: string;
  value: number;
  secondaryValue?: number;
  maxValue: number;
  examples: string[];
  shoppingCartData: any;
  action: string;
};

type ChartPopupProps = {
  data: PopupData;
  isHidden: boolean;
  width?: number;
  height?: number;
  topOffset?: number;
  isVertical?: boolean;
  setValueText: (value) => string;
};

const ChartPopup: React.FC<ChartPopupProps> = (props) => {
  const {
    data,
    isHidden,
    width = 250,
    height = 150,
    topOffset = 0,
    isVertical = false,
    setValueText,
  } = props;
  data.examples = data.examples.filter((text) => {
    if (text !== "") return text;
    else return null;
  });
  const popupSpring: any = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      // transform: `translate(${data.location[0] - width / 2}px, ${Math.round(
      //   data.location[1] + topOffset
      // )}px)`,
      transform: isVertical
        ? `translate(${Math.max(data.location[0] - width / 2, 0)}px,${
            topOffset - height + data.location[1]
          }px)`
        : `translate(${Math.max(data.location[0] - width, 0)}px,${
            topOffset - height / 2 + data.location[1] + 22
          }px)`,
      opacity: isHidden ? 0 : 1,
    },
  });

  const percentage = ((data.value / data.maxValue) * 100).toFixed(2);

  const numberText =
    data.shoppingCartData && data.shoppingCartData.action === "Buy"
      ? ` - [Buy  ${numberWithCommas(data.shoppingCartData.expectedCount)}]`
      : ` - [${data.action}]`;
  return (
    <React.Fragment>
      <animated.div
        className="chart-popup"
        style={{ ...popupSpring, width, height }}
      >
        <div
          className="chart-popup__triangle"
          style={
            isVertical
              ? { bottom: "0", left: "50%" }
              : { bottom: "calc(50% - 6px)", left: "100%" }
          }
        ></div>

        <div className="chart-popup__title">{`${data.name}${numberText}`} </div>
        <div className="chart-popup__title">{setValueText(data.value)} </div>
        <div className="chart-popup__examples" id="examples">
          {data.examples.length > 0 && <b>Used In:</b>}
          {data.examples.map((text, index) => {
            return <div key={index}>{text}</div>;
          })}
        </div>
        {/* <div className="chart-popup__value">
        ...of <span id="count"></span> uses
      </div> */}
        <div className="chart-popup__bar-value">
          <b>
            <span id="chart-popup__bar-value">{percentage}</span>%
          </b>{" "}
          of the total cost
        </div>
        <div className="chart-popup__bar">
          <div
            className="chart-popup__bar-item"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </animated.div>
    </React.Fragment>
  );
};

export default ChartPopup;
