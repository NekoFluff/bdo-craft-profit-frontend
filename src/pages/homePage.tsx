import React from "react";
import SearchBar from "../components/SearchBar";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import { withRouter, RouteComponentProps } from "react-router";
import PPSTable from "../components/PPSTable";
import { Container, Row, Col } from "react-bootstrap";
import Background from "../components/Background";
import BackgroundImage from "../images/webb.png";
import CommonPage from "./commonPage";
import PageTransition from "../components/PageTransition";
import UnderConstruction from "../components/UnderConstruction";

type UserStatsPageProps = {} & RouteComponentProps<{ item: string }>;

const UserStatsPage: React.FC<UserStatsPageProps> = (props) => {
  return (
    <CommonPage>
      <PageTransition>
        <Background backgroundImage={`url(${BackgroundImage})`}>
          <h1 className="p-3" style={{ textAlign: "center" }}>
            Craft Profit v0.3.0
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
        <Row className="justify-content-center">
          <UnderConstruction>
            This website is a work in progress. More features are continually
            being added weekly. Join our{" "}
            <a href="https://discord.gg/ZU7be8C" target="_blank">
              discord
            </a>
            .
          </UnderConstruction>
        </Row>
      </PageTransition>
    </CommonPage>
  );
};

export default withRouter(UserStatsPage);
