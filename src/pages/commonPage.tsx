import React from "react";
import { Container } from "react-bootstrap";

import MyNavBar from "../components/common/Navbar";
import PageTransition from "../components/common/PageTransition";

type commonPageProps = {};

const commonPage: React.FC<commonPageProps> = (props) => {
  return (
    <Container fluid style={{ margin: 0, padding: 0, height: "100%" }}>
      <PageTransition>
        <div className="d-flex flex-column" style={{ height: "100%" }}>
          <div>
            <MyNavBar></MyNavBar>
          </div>
          <div className="align-self-stretch flex-grow-1">{props.children}</div>
          {/* <div>Flex item</div> */}
        </div>
      </PageTransition>
    </Container>
  );
};

export default commonPage;
