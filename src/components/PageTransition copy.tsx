import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useInterval } from "./hooks/useInterval";
import useWindowSize from "./hooks/useWindowSize";
import { useTransition, animated, config } from "react-spring";
import Logo from "../components/Logo";
import { Row, Col } from "react-bootstrap";

type PageTransitionProps = {
  // location: string;
};

const PageTransition: React.FC<PageTransitionProps> = (props) => {
  const [width, height] = useWindowSize();
  const [contentReady, setContentReady] = useState(false);
  const [renderContent, setRenderContent] = useState(false);
  // const { location } = props;
  const history = useHistory();

  useEffect(() => {
    // if (contentReady) history.push(location);
  }, [contentReady]);

  const transitionProperties: any = {
    config: config.slow,
    from: {
      top: -height,
      backgroundColor: "yellow",
    },
    enter: {
      top: contentReady ? -height : 0,
      // opacity: contentReady ? 0 : 1,
      backgroundColor: contentReady ? "green" : "yellow",
    },
    leave: {
      top: -height,
      backgroundColor: "green",
    },
  };

  const transition: any = useTransition(
    contentReady,
    null,
    transitionProperties
  );

  useInterval(() => {
    setRenderContent(true);
  }, 1250); // 1250

  useInterval(() => {
    setContentReady(true);
  }, 2500); // 2500

  return (
    <React.Fragment>
      {/* {transition.map(({ item, key, transitionProps }) => {
        return item ? (
          <animated.div
            style={{
              ...transitionProps,
              position: "fixed",
              margin: 0,
              padding: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 2000,
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // textAlign: "center",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center flex-column"
              style={{ height: "100%" }}
            >
              <div className="mt-auto">
                <Logo runAnimation={!contentReady} />
              </div>
              <div className="mt-auto" style={{ fontSize: "0.75em" }}>
                Icon made by{" "}
                <a
                  href="https://www.flaticon.com/authors/smashicons"
                  title="Smashicons"
                  target="_blank"
                >
                  Smashicons
                </a>{" "}
                from{" "}
                <a
                  href="https://www.flaticon.com/"
                  title="Flaticon"
                  target="_blank"
                >
                  {" "}
                  www.flaticon.com
                </a>
              </div>
            </div>
          </animated.div>
        ) : (
          <>{props.children}</>
        );
      })} */}
      {contentReady && props.children}
    </React.Fragment>
  );
};

export default PageTransition;
