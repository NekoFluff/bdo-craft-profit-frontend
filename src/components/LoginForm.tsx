import React, { useCallback } from "react";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import { GOOGLE_OAUTH_CLIENT_ID } from "../helpers/CONSTANTS";
import { loginUser, logoutUser } from "../store/user";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();

  const responseGoogle = useCallback(
    (response) => {
      console.log("Google Response:", response);
      if (response.profileObj != null) {
        dispatch(
          loginUser(
            {},
            {
              "x-auth-google-token": response.tokenId,
            }
          )
        );
      }
    },
    [dispatch]
  );

  const logoutSuccess = useCallback(() => {
    dispatch(logoutUser());
    console.log("Logout successful");
  }, [dispatch]);

  return (
    <div>
      <GoogleLogin
        clientId={GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
      <GoogleLogout
        clientId={GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logoutSuccess}
      ></GoogleLogout>
    </div>
  );
};

export default LoginForm;
