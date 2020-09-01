import React, { useCallback, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Container } from "react-bootstrap";
import CommonPage from "./commonPage";

type NotFoundPageProps = {} & RouteComponentProps<{ item: string }>;

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  return (
    <CommonPage>
      <h1 className="p-3" style={{ textAlign: "center" }}>
        Craft Profit v0.2.0
      </h1>
      <Container>Sorry but this page doesn't exist!</Container>
    </CommonPage>
  );
};

export default withRouter(NotFoundPage);
