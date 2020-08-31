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

type LogoutPageProps = {} & RouteComponentProps<{ item: string }>;

const LogoutPage: React.FC<LogoutPageProps> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser());

  const logoutSuccess = useCallback(() => {
    dispatch(logoutUser());
    console.log("Logout successful");
  }, [dispatch]);

  const { signOut } = useGoogleLogout({
    // jsSrc,
    // onFailure,
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
  if (user.type == "Google") {
    signOutFunction = signOut;
  } else {
    signOutFunction = logoutSuccess;
  }

  useEffect(() => {
    signOutFunction();
  }, []);

  return (
    <React.Fragment>
      <MyNavBar></MyNavBar>
      <h1 className="p-3" style={{ textAlign: "center" }}>
        Craft Profit v0.2.0
      </h1>
      <Container>
        {user.email != "" && <div>Logging Out...</div>}
        {user.email == "" && <div>Goodbye!</div>}
        <div>Come back soon! I love you!</div>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(LogoutPage);
