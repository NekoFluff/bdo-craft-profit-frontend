import React from "react";
import { Container } from "react-bootstrap";
import MyNavBar from "../components/Navbar";

type commonPageProps = {};

const commonPage: React.FC<commonPageProps> = (props) => {
  return (
    <Container fluid style={{ margin: 0, padding: 0, height: "100%" }}>
      <MyNavBar></MyNavBar>
      {props.children}
    </Container>
  );
};

export default commonPage;
