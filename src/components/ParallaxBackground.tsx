import React from "react";
import { Container } from "react-bootstrap";
import { animated, useSpring } from "react-spring";

type ParallaxBackgroundProps = {
  backgroundImage: string;
};

const calc = (x, y) => [window.innerWidth / 2 - x, window.innerHeight / 2 - y];
const trans1 = (x, y) =>
  `translate3d(calc(-50vw - ${x / 30}px),calc(-50vh - ${y / 30}px),0)`;

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = (props) => {
  const [spring, set]: any = useSpring(() => ({
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
    top: "50vh",
    left: "50vw",

    minHeight: "110vh",
    minWidth: "110vw",
    marginLeft: "-5vw",
    marginTop: "-9vh",
    padding: "0%",
    overflow: "hidden",
  };

  return (
    <Container
      fluid
      style={{ padding: 0, overflow: "hidden", height: "100%" }}
      onMouseMove={({ clientX: x, clientY: y }) => {
        const target: any = { xy: calc(x, y) };
        set(target);
      }}
    >
      <animated.div
        style={{
          ...backgroundStyle,
          transform: spring.xy.interpolate(trans1),
        }}
      ></animated.div>
      {props.children}
    </Container>
  );
};

export default ParallaxBackground;
