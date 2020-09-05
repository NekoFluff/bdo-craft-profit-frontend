import React from "react";
import ConstructionImage from "../images/under-construction.gif";
import StripesImage from "../images/stripes.jpg";
import { Image, Container, Row, Jumbotron, Col } from "react-bootstrap";
import PageTransition from "./PageTransition";

type UnderConstructionProps = {};

const UnderConstruction: React.FC<UnderConstructionProps> = (props) => {
  // const { text } = props;
  return (
    <Container
      style={{
        margin: "1em",
        backgroundColor: "rgb(255, 221, 0)",
        borderStyle: "dashed",
        borderColor: "rgb(225, 190, 0)",
        borderRadius: "1px",
        position: "relative",
        // backgroundImage: `url(${StripesImage})`,
        // opacity: "10%",
      }}
    >
      <Row
        className={"justify-content-between align-items-center "}
        style={{ padding: "1em", textAlign: "center" }}
      >
        <Image
          fluid
          src={`${ConstructionImage}`}
          // style={{ transform: "scaleY(0.5) scaleX(0.5)" }}
          style={{ width: "7.5%", height: "7.5%" }}
        />
        <div>
          <h1>Under Construction</h1>
          {props.children || (
            <p style={{ fontFamily: "Roboto" }}>
              {"These little guys are putting the website together."}
            </p>
          )}
        </div>
        <Image
          // style={{ transform: "scaleY(-0.5) scaleX(-0.5)" }}
          style={{
            width: "7.5%",
            height: "7.5%",
            transform: "scaleY(-1) scaleX(-1)",
          }}
          src={`${ConstructionImage}`}
        />
      </Row>
    </Container>
  );
};

export default UnderConstruction;
