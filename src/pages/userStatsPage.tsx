import React from "react";
import SearchBar from "../components/SearchBar";
import MostSearchedItemsTable from "../components/MostSearchedItemsTable";
import { withRouter, RouteComponentProps } from "react-router";
import PPSTable from "../components/PPSTable";
import { Container, Row, Col } from "react-bootstrap";
import Background from "../components/Background";
import BackgroundImage from "../images/webb.png";
import CommonPage from "./commonPage";
import ItemCards from "../components/ItemCards";
import AnimatedCircles from "../components/ItemCardsAnimated";
import HierarchicalBarGraph from "../components/HierarchicalBarGraph";
import root from "../helpers/parseItemFromMongo";
import ChartWithDimensions from "../components/ChartWithDimensions";

type UserStatsPageProps = {} & RouteComponentProps<{ item: string }>;

const UserStatsPage: React.FC<UserStatsPageProps> = (props) => {
  return (
    <CommonPage>
      <Background backgroundImage={`url(${BackgroundImage})`}>
        <h1 className="p-3" style={{ textAlign: "center" }}>
          Your Stats
        </h1>
        <svg
          style={{
            border: "2px solid gold",
          }}
        />
        {/* <Container>
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
        </Container> */}
        {/* <ItemCards /> */}
        <AnimatedCircles />
        <Container
          fluid
          className="d-flex align-items-center align-content-center justify-content-center"
        >
          <ChartWithDimensions
            chartSettings={{
              width: "1500",
              height: "900",
              marginTop: "150",
              marginRight: "150",
              marginBottom: "150",
              marginLeft: "150",
            }}
          />
        </Container>
      </Background>
    </CommonPage>
  );
};

export default withRouter(UserStatsPage);
