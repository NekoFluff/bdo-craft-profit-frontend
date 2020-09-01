import React from "react";
import { Container } from "react-bootstrap";

type BackgroundProps = {
  backgroundImage: string;
};

const Background: React.FC<BackgroundProps> = (props) => {
  var backgroundStyle = {
    backgroundImage: props.backgroundImage,
    // paddingBottom: "7%",
    // paddingTop: "7%",
    height: "100%",
    margin: 0,
    padding: "4%",
  };

  return (
    <Container fluid style={{ padding: 0, margin: 0 }}>
      <div style={backgroundStyle}>{props.children}</div>
    </Container>
  );
};

export default Background;
