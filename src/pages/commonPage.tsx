import React from "react";
import { Container } from "react-bootstrap";
import MyNavBar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

type commonPageProps = {};

const commonPage: React.FC<commonPageProps> = (props) => {
  return (
    <Container fluid style={{ margin: 0, padding: 0, height: "100%" }}>
      <PageTransition>
        <MyNavBar></MyNavBar>
        {props.children}
      </PageTransition>
    </Container>
  );
};

export default commonPage;
