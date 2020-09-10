// scss
import "../scss/HomePage.scss";

// Packages
import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Container, Row, Col } from "react-bootstrap";

// My components
import CommonPage from "./commonPage";
import SearchBar from "../components/SearchBar";
import ParallaxBackground from "../components/ParallaxBackground";
import BackgroundImage from "../images/bg1.png";
import PPSTable from "../components/PPSTable";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import UnderConstruction from "../components/UnderConstruction";

type UserStatsPageProps = {} & RouteComponentProps<{ item: string }>;

const UserStatsPage: React.FC<UserStatsPageProps> = (props) => {
  return (
    <CommonPage>
      <ParallaxBackground backgroundImage={`url(${BackgroundImage})`}>
        <Container
          className="home-page__body"
          style={{ position: "relative", height: "100%" }}
        >
          <Col className="home-page" style={{ top: "23%" }}>
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
