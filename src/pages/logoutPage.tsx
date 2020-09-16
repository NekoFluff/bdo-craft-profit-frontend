import React, { useCallback, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useGoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { NavLink } from "react-router-dom";

import ParallaxBackground from "../components/background/ParallaxBackground";
import { GOOGLE_OAUTH_CLIENT_ID } from "../helpers/CONSTANTS";
import BackgroundImage from "../images/webb.png";
import { logoutUser } from "../store/user";
import { getCurrentUser } from "../store/user";
import CommonPage from "./commonPage";

type LogoutPageProps = {} & RouteComponentProps<{ item: string }>;

const LogoutPage: React.FC<LogoutPageProps> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser());

  const logoutSuccess = useCallback(() => {
    dispatch(logoutUser());
    console.log("Google logout successful");
  }, [dispatch]);

  const logoutFailure = useCallback(() => {
    dispatch(logoutUser());
    console.log("Google logout failed");
  }, [dispatch]);

  const { signOut } = useGoogleLogout({
    // jsSrc,
    onFailure: logoutFailure,
    clientId: GOOGLE_OAUTH_CLIENT_ID,
    // cookiePolicy,
    // loginHint,
    // hostedDomain,
    // fetchBasicProfile,
    // discoveryDocs,
    // uxMode,
    // redirectUri,
    // scope,
    // accessType,
    onLogoutSuccess: logoutSuccess,
  });

  let signOutFunction: any;
  if (user.type === "Google") {
    signOutFunction = signOut;
  } else {
    signOutFunction = logoutSuccess;
  }

  useEffect(() => {
    signOutFunction();
    logoutSuccess(); // Force logout. The React Google package is bugged.
  }, [signOutFunction]);

  return (
    <CommonPage>
      <ParallaxBackground
        backgroundRepeat
        backgroundImage={`url(${BackgroundImage})`}
      >
        <Container
          fluid
          style={{
            // marginTop: "5%",
            display: "flex",
            justifyContent: "center",
            height: "95%",
          }}
        >
          <Row
            className="justify-content-around"
            style={{ textAlign: "center", flexDirection: "column" }}
          >
            <>
              <div>
                {user.email !== "" && <h1>Logging Out...</h1>}
                {user.email === "" && <h1>Goodbye!</h1>}
                <h5>Come back soon! I love you!</h5>
              </div>
              <Button variant="primary">
                <NavLink
                  to="/"
                  className="menu-item navbar-brand"
                  exact
                  style={{ margin: "0px", fontSize: "1.25em", color: "white" }}
                >
                  Return Home
                </NavLink>
              </Button>

              <br />
            </>
          </Row>
        </Container>
      </ParallaxBackground>
    </CommonPage>
  );
};

export default withRouter(LogoutPage);
