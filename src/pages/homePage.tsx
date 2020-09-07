import React from "react";
import SearchBar from "../components/SearchBar";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import { withRouter, RouteComponentProps } from "react-router";
import PPSTable from "../components/PPSTable";
import { Container, Row, Col } from "react-bootstrap";
import BackgroundImage from "../images/bg1.png";

import CommonPage from "./commonPage";
import UnderConstruction from "../components/UnderConstruction";
import ParallaxBackground from "../components/ParallaxBackground";

import "../scss/HomePage.scss";

type UserStatsPageProps = {} & RouteComponentProps<{ item: string }>;

const UserStatsPage: React.FC<UserStatsPageProps> = (props) => {
  return (
    <CommonPage>
      <ParallaxBackground backgroundImage={`url(${BackgroundImage})`}>
        <Container
          className="home-page__body"
          style={{ position: "relative", height: "100%" }}
        >
          <Col className="flex-grow-1 flex-shrink-1" style={{ top: "27%" }}>
            <h1 className="p-2 home-page__title">Craft Profit</h1>
            <SearchBar />
          </Col>

          {/* <Row>
              <Col>
                <PPSTable />
              </Col>
            </Row>
            <Row>
              <Col>
                <MostSearchedItemsTable></MostSearchedItemsTable>
              </Col>
            </Row> */}
          {/* <Row className="mt-auto justify-content-center align-items-end">
              <UnderConstruction>
                This website is a work in progress. More features are
                continually being added weekly. Join our{" "}
                <a href="https://discord.gg/ZU7be8C" target="_blank">
                  discord
                </a>
                .
              </UnderConstruction>
            </Row> */}
        </Container>
      </ParallaxBackground>
    </CommonPage>
  );
};

export default withRouter(UserStatsPage);
