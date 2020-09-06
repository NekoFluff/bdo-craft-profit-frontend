import React from "react";
import { Container } from "react-bootstrap";
import { animated, useSpring } from "react-spring";

type ParallaxBackgroundProps = {
  backgroundImage: string;
};

const calc = (x, y) => [window.innerWidth / 2 - x, window.innerHeight / 2 - y];
const trans1 = (x, y) => `translate3d(${x / 30}px,${y / 30}px,0)`;

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = (props) => {
  const [spring, set] = useSpring(() => ({
    to: {
      xy: [0, 0],
      config: { mass: 10, tension: 550, friction: 140 },
    },
  }));

  var backgroundStyle: any = {
    backgroundImage: props.backgroundImage,
    // paddingBottom: "7%",
    // paddingTop: "7%",
    position: "fixed",
    // "background-attachment": "fixed",
    // "background-position": "center",
    // "background-repeat": "no-repeat",
    // "background-size": "cover",

    minHeight: "105vh",
    minWidth: "105vw",
    marginLeft: "-2.5%",
    marginTop: "-2.5%",
    padding: "0%",
    overflow: "hidden",
  };

  return (
    <Container
      fluid
      style={{ padding: 0, overflow: "hidden" }}
      onMouseMove={({ clientX: x, clientY: y }) => {
        set({ xy: calc(x, y) });
      }}
    >
      <animated.div
        style={{ ...backgroundStyle, transform: spring.xy.interpolate(trans1) }}
      ></animated.div>
      {props.children}
    </Container>
  );
};

export default ParallaxBackground;
