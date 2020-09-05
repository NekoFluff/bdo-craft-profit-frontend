import React from "react";
import { useSpring, animated, config } from "react-spring";

type LogoProps = {
  runAnimation: boolean;
};

const Logo: React.FC<LogoProps> = ({ runAnimation }) => {
  const from = {
    transform: "rotate(0) translate(0,0)",
    "transform-origin": "0px 0px",
    opacity: 1,
  };

  const to = {
    transform: "rotate(90) translate(10,0)",
    "transform-origin": "200px 0px",
    opacity: 0,
  };

  const spring = useSpring({
    // config: config.wobbly,
    // config: config.gentle,
    config: config.stiff,
    from: from,
    to: async (next) => {
      while (runAnimation) {
        await next(from);
        await next(to);
      }
    },
  });

  return (
    // <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
    //   <animated.rect {...spring} className="shape" height="60" width="320" />
    // </svg>
    <React.Fragment>
      <svg
        height="100"
        viewBox="0 -50 109 109"
        width="100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="041---Forging" fill="none">
          <animated.g {...spring} y="-100">
            <path
              id="hammer_handle"
              d="m59 11v3c.0001685.5392108-.2173948 1.0556452-.6033522 1.432189s-.9076055.5812913-1.4466478.567811l-.95-.02-4-.1-2-.05-12-.3-14-.35-3.05-.08c-1.0849951-.0271333-1.9503392-.9146657-1.95-2v-1.2c-.0003392-1.0853343.8650049-1.97286669 1.95-2l3.05-.08 14-.35 18.95-.47c.5390423-.0134803 1.0606904.19126723 1.4466478.567811s.6035207.8929782.6033522 1.432189z"
              fill="#cb8252"
            />
            <rect
              id="hammer_metal"
              fill="#35495e"
              width="14"
              height="23"
              rx="3"
              x="24"
              y="1"
            />
            <g fill="#a56a43">
              <path
                id="Shape"
                d="m56 13v2.98l-2-.05v-2.93c0-.5522847.4477153-1 1-1s1 .4477153 1 1z"
              />
              <path
                id="Shape"
                d="m52 13v2.88l-2-.05v-2.83c0-.5522847.4477153-1 1-1s1 .4477153 1 1z"
              />
            </g>
          </animated.g>

          <animated.g opacity={spring.opacity}>
            <path
              id="spark_right"
              d="m15 13c-.5522847 0-1-.4477153-1-1v-11c0-.55228475.4477153-1 1-1s1 .44771525 1 1v11c0 .5522847-.4477153 1-1 1z"
              fill="#f29c1f"
            />
            <path
              id="spark_bottom"
              d="m12 16h-5c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h5c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1z"
              fill="#f29c1f"
            />
            <path
              id="spark_middle"
              d="m11 12c-.2651948-.0000566-.5195073-.1054506-.707-.293l-4-4c-.37897221-.39237889-.37355237-1.01608478.01218142-1.40181858.3857338-.38573379 1.00943969-.39115363 1.40181858-.01218142l4 4c.2859079.2859943.3714219.7160366.216678 1.0896546-.1547439.3736179-.5192821.6172591-.923678.6173454z"
              fill="#f3d55b"
            />
            <path
              id="spark_middle-2"
              d="m4 5c-.26519481-.00005664-.51950727-.10545063-.707-.293l-2-2c-.37897221-.39237889-.37355237-1.01608478.01218142-1.40181858.3857338-.38573379 1.00943969-.39115363 1.40181858-.01218142l2 2c.28590792.28599425.37142191.71603662.21667798 1.08965456s-.51928208.61725909-.92367798.61734544z"
              fill="#f3d55b"
            />
            <path
              id="spark-bottom-2"
              d="m3 16h-2c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1h2c.55228475 0 1 .4477153 1 1s-.44771525 1-1 1z"
              fill="#f29c1f"
            />
          </animated.g>
          <path
            id="anvil_front"
            d="m15 34c-9 0-13-1-13.965-6.711-.07577087-.3029589-.01111462-.623932.17604237-.8739272.187157-.2499952.4769227-.4024417.78895763-.4150728h15z"
            fill="#a5a5a4"
          />
          <path
            id="anvil_mid"
            d="m22 53c3.009-6.637 3.615-10.363 1.154-17l13.846-2 13.846 2c-2.461 6.637-1.855 10.363 1.154 17l-15 2z"
            fill="#56595e"
          />
          <path
            id="anvil_bottom-left"
            d="m18 55c-.5522847 0-1-.4477153-1-1v-5c0-.5522847.4477153-1 1-1s1 .4477153 1 1v5c0 .5522847-.4477153 1-1 1z"
            fill="#464f5d"
          />
          <path
            id="anvil_bottom-right"
            d="m56 55c-.5522847 0-1-.4477153-1-1v-5c0-.5522847.4477153-1 1-1s1 .4477153 1 1v5c0 .5522847-.4477153 1-1 1z"
            fill="#464f5d"
          />
          <rect
            id="anvil_bottom"
            fill="#7f8284"
            height="6"
            rx="1"
            width="44"
            x="15"
            y="53"
          />
          <rect
            id="anvil_top"
            fill="#7f8284"
            height="12"
            rx="1"
            width="44"
            x="15"
            y="24"
          />
          <path
            id="anvil_light-line-1"
            d="m21 29h-2c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1h2c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1z"
            fill="#a5a5a4"
          />
          <path
            id="anvil_light-line-2"
            d="m50 29h-25c-.5522847 0-1-.4477153-1-1s.4477153-1 1-1h25c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1z"
            fill="#a5a5a4"
          />
        </g>
      </svg>
    </React.Fragment>
  );
};

export default Logo;
