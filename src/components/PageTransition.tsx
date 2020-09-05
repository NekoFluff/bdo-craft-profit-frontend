import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useInterval } from "./hooks/useInterval";
import useWindowSize from "./hooks/useWindowSize";
import { useSpring, animated } from "react-spring";

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

  const positionSpring: any = useSpring({
    // config: {
    //   duration: 750,
    // },
    top: contentReady ? -height : 0,
    // opacity: contentReady ? 0 : 1,
    backgroundColor: contentReady ? "red" : "yellow",
    from: {
      top: -height,
      backgroundColor: "green",
    },
  });

  useInterval(() => {
    setRenderContent(true);
  }, 1250);

  useInterval(() => {
    setContentReady(true);
  }, 2500);

  return (
    <React.Fragment>
      <animated.div
        style={{
          ...positionSpring,
          position: "fixed",
          margin: 0,
          padding: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 2000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p style={{}}>Hello World</p>
      </animated.div>
      {renderContent && props.children}
    </React.Fragment>
  );
};

export default PageTransition;
