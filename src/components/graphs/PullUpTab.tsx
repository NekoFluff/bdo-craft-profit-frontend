// Packages
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Scrollbars } from "react-custom-scrollbars";
import { animated, useSpring } from "react-spring";
import numberWithCommas from "../../helpers/numberWithCommas";

import { setCostValues, setTimeValues } from "../../helpers/parseItemFromRedux";
// scss
import "../../scss/PullUpTab.scss";

// My components
import DoubleArrow from "../common/DoubleArrow";
import useWindowSize from "../hooks/useWindowSize";
import chartWithDimensions from "./chartWithDimensions";
import HierarchicalBarGraph from "./HierarchicalBarGraph";

const PullUpTab = () => {
  const [width] = useWindowSize();
  const pullTabHeight = "40px";
  const [isOpen, setIsOpen] = useState(false);

  let breakpoints = [576, 768, 992, 1200];
  let heightsAtBreakpoints = ["90%", "90%", "55%", "50%"];
  const pickHeight = () => {
    let index = 0;
    for (
      let breakPointIndex = 0;
      breakPointIndex < breakpoints.length;
      breakPointIndex++
    ) {
      if (width > breakpoints[breakPointIndex]) {
        index = breakPointIndex;
      }
    }
    return heightsAtBreakpoints[index];
  };
  const maxHeight = pickHeight();

  const containerSpring = useSpring({
    from: {
      height: `calc(0% + ${pullTabHeight})`,
    },
    to: {
      height: isOpen
        ? `calc(${maxHeight} + 0px)`
        : `calc(0% + ${pullTabHeight})`,
    },
  });

  const tabSpring = useSpring({
    to: {
      height: isOpen ? `calc(0% + ${pullTabHeight})` : "calc(100% + 0px)",
    },
  });

  const contentSpring = useSpring({
    to: {
      height: isOpen ? "90%" : "0%",
    },
  });
  const margin = width / 12;
  const spaceForText = 200;
  const SilverChart = chartWithDimensions(
    HierarchicalBarGraph,
    {
      width: `${width * 0.7}`,
      height: "900",
      marginTop: `${Math.min(margin, 75)}`,
      marginRight: `${0}`,
      marginBottom: `${Math.min(margin, 45)}`,
      marginLeft: `${0}`,
      paddingLeft: `${spaceForText}`,
    },
    "Total Silver Spent"
  );

  const TimeChart = chartWithDimensions(
    HierarchicalBarGraph,
    {
      width: `${width * 0.7}`,
      height: "900",
      marginTop: `${Math.min(margin, 75)}`,
      marginRight: `${margin}`,
      marginBottom: `${Math.min(margin, 45)}`,
      marginLeft: `${margin}`,
      paddingLeft: `${spaceForText}`,
    },
    "Total Crafting Time"
  );

  return (
    <animated.div className="pullup-tab" style={{ ...containerSpring }}>
      <div className="pullup-tab-flex-container">
        <animated.div
          className="pullup-tab-indicator"
          style={{ ...tabSpring }}
          onClick={() => {
            console.log("Pull Tab Clicked");
            setIsOpen(!isOpen);
          }}
        >
          <DoubleArrow size={pullTabHeight} reverse={isOpen ? true : false} />
        </animated.div>
        <animated.div
          className="pullup-tab-content"
          style={{ ...contentSpring }}
        >
          <Scrollbars
            style={{
              height: `100%`,
            }}
          >
            {/* <h1 className="pullup-tab-overflow-content">Content 1</h1>
            <h1 className="pullup-tab-overflow-content">Content 2</h1>
            <h1 className="pullup-tab-overflow-content">Content 3</h1>
            <h1 className="pullup-tab-overflow-content">Content 4</h1>
            <h1 className="pullup-tab-overflow-content">Content 5</h1>
            <h1 className="pullup-tab-overflow-content">Content 6</h1>
            <h1 className="pullup-tab-overflow-content">Content 7</h1>
            <h1 className="pullup-tab-overflow-content">Content 8</h1>
            <h1 className="pullup-tab-overflow-content">Content 9</h1>
            <h1 className="pullup-tab-overflow-content">Content 10</h1>
            <h1 className="pullup-tab-overflow-content">Content 11</h1>
            <h1 className="pullup-tab-overflow-content">Content 12</h1>
            <h1 className="pullup-tab-overflow-content">Content 13</h1>
            <h1 className="pullup-tab-overflow-content">Content 14</h1>
            <h1 className="pullup-tab-overflow-content">Content 15</h1>
            <h1 className="pullup-tab-overflow-content">Content 16</h1>
            <h1 className="pullup-tab-overflow-content">Content 17</h1> */}
            <Carousel
              // fade
              interval={null}
              nextIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-next-icon"
                  style={{
                    backgroundColor: "gray",
                    width: "25%",
                    height: "25%",
                    padding: "3em",
                    margin: "1em",
                    borderRadius: "0.5em",
                  }}
                />
              }
              nextLabel={"Next"}
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon"
                  style={{
                    backgroundColor: "gray",
                    width: "25%",
                    height: "25%",
                    padding: "3em",
                    margin: "1em",

                    borderRadius: "0.5em",
                  }}
                />
              }
              prevLabel={"Previous"}
            >
              <Carousel.Item>
                <SilverChart
                  setValues={setCostValues}
                  setValueText={(value) => {
                    return `${numberWithCommas(value)} Silver`;
                  }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <TimeChart
                  setValues={setTimeValues}
                  setValueText={(value) => {
                    return `${numberWithCommas(value)} Seconds Total`;
                  }}
                />
              </Carousel.Item>
            </Carousel>
          </Scrollbars>
        </animated.div>
      </div>
    </animated.div>
  );
};

export default PullUpTab;
