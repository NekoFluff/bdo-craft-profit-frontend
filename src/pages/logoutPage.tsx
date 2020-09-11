import React, { useCallback, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useGoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { GOOGLE_OAUTH_CLIENT_ID } from "../helpers/CONSTANTS";
import { logoutUser } from "../store/user";
import { getCurrentUser } from "../store/user";
import CommonPage from "./commonPage";

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
    <CommonPage>
      <Container>
        {user.email != "" && <div>Logging Out...</div>}
        {user.email == "" && <div>Goodbye!</div>}
        <div>Come back soon! I love you!</div>
      </Container>
    </CommonPage>
  );
};

export default withRouter(LogoutPage);
