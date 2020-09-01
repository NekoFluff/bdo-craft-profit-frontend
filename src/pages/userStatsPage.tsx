import React from "react";
import SearchBar from "../components/SearchBar";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import { withRouter, RouteComponentProps } from "react-router";
import PPSTable from "../components/PPSTable";
import { Container, Row, Col } from "react-bootstrap";
import Background from "../components/Background";
import BackgroundImage from "../images/webb.png";
import CommonPage from "./commonPage";

type UserStatsPageProps = {} & RouteComponentProps<{ item: string }>;

const UserStatsPage: React.FC<UserStatsPageProps> = (props) => {
  return (
    <CommonPage>
      <Background backgroundImage={`url(${BackgroundImage})`}>
        <h1 className="p-3" style={{ textAlign: "center" }}>
          Craft Profit v0.2.0
        </h1>
        <Container>
          <Row className="justify-content-center">
            <Col>
              <SearchBar />
            </Col>
          </Row>
          <Row>
            <Col>
              <PPSTable />
            </Col>
          </Row>
          <Row>
            <Col>
              <MostSearchedItemsTable></MostSearchedItemsTable>
            </Col>
          </Row>
        </Container>
      </Background>
    </CommonPage>
  );
};

export default withRouter(UserStatsPage);
