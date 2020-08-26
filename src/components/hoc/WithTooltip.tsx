import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// function withTooltip(WrappedComponent, tooltip) {
//   return class WithTooltip extends React.Component {
//     render() {
//       return (
//         // <OverlayTrigger
//         //   trigger={["hover", "focus"]}
//         //   overlay={<Tooltip id="tooltip">{tooltip}</Tooltip>}
//         // >
//         <WrappedComponent />
//         // </OverlayTrigger>
//       );
//     }
//   };
// }

const WithTooltip = (props) => {
  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      overlay={<Tooltip id="tooltip">{props.tooltip}</Tooltip>}
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default WithTooltip;
