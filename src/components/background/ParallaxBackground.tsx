import React from "react";
import { Container } from "react-bootstrap";
import { animated, useSpring } from "react-spring";

type ParallaxBackgroundProps = {
  backgroundImage: string;
  backgroundRepeat?: boolean;
};

const calc = (x, y) => [window.innerWidth / 2 - x, window.innerHeight / 2 - y];
const trans1 = (x, y) =>
  `translate3d(calc(-50vw + ${x / 30}px),calc(-50vh + ${y / 30}px),0)`;

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = (props) => {
  const { backgroundRepeat, backgroundImage } = props;
  const [spring, set]: any = useSpring(() => ({
    to: {
      xy: [0, 0],
      config: { mass: 10, tension: 550, friction: 140 },
    },
  }));

  var backgroundStyle: any = {
    backgroundImage: backgroundImage,
    // paddingBottom: "7%",
    // paddingTop: "7%",
    position: "fixed",
    // "background-attachment": "fixed",
    // "background-position": "center",
    backgroundRepeat: !backgroundRepeat ? "no-repeat" : "repeat",
    backgroundSize: !backgroundRepeat ? "cover" : "auto",
    top: "50vh",
    left: "50vw",

    minHeight: "115vh",
    minWidth: "115vw",
    marginLeft: "-5vw",
    marginTop: "-5vh",
    padding: "0%",
    overflow: "hidden",
  };

  return (
    <Container
      fluid
      style={{ padding: 0, height: "100%" }}
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
