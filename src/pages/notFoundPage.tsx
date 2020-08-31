import React, { useCallback, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Container } from "react-bootstrap";
import MyNavBar from "../components/Navbar";
import { GOOGLE_OAUTH_CLIENT_ID } from "../helpers/CONSTANTS";
import { useDispatch } from "react-redux";
import { useGoogleLogout } from "react-google-login";
import { logoutUser } from "../store/user";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/user";
import { Button } from "react-bootstrap";

type NotFoundPageProps = {} & RouteComponentProps<{ item: string }>;

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  return (
    <React.Fragment>
      <MyNavBar></MyNavBar>
      <h1 className="p-3" style={{ textAlign: "center" }}>
        Craft Profit v0.2.0
      </h1>
      <Container>Sorry but this page doesn't exist!</Container>
    </React.Fragment>
  );
};

export default withRouter(NotFoundPage);
