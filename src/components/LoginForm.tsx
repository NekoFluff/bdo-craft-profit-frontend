import React, { useCallback, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { GOOGLE_OAUTH_CLIENT_ID } from "../helpers/CONSTANTS";
import { loginUser } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../scss/LoginForm.scss";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { getCurrentUser } from "../store/user";
import { RootState } from "../store/reducer";
import { Alert } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const user = useSelector(getCurrentUser());
  const error = useSelector(
    (state: RootState) => state.entities.currentUser.error
  );

  useEffect(() => {
    if (user.name != "") history.push("/");
  }, [user]);

  const responseGoogle = useCallback(
    (response) => {
      console.log("Google Response:", response);
      if (response.profileObj != null) {
        dispatch(
          loginUser(null, {
            "X-Auth-Google-Token": response.tokenId,
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <Form className="login-form">
      <h1 className="login-form__title">Sign In</h1>

      {error && <Alert variant={"danger"}>{error}</Alert>}

      <Form.Group className="login-form__group" controlId="formBasicEmail">
        {/* <Form.Label>EMAIL</Form.Label> */}
        <Form.Control
          className="login-form__control"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="login-form__group" controlId="formBasicPassword">
        {/* <Form.Label>PASSWORD</Form.Label> */}
        <Form.Control
          className="login-form__control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            console.log("New Password:", password);
            setPassword(e.target.value);
          }}
        />
      </Form.Group>

      {/* <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Stay signed in" />
      </Form.Group> */}

      <Button
        className="login-form__submit"
        disabled={email == "" || password == ""}
        id="container"
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();

          dispatch(
            loginUser({
              email,
              password,
            })
          );
        }}
      >
        <ArrowForwardIcon id="arrowIcon" />
      </Button>

      <NavLink id="signUp" to="/signup" className="menu-item nav-link">
        Sign Up
      </NavLink>
      <div>
        <GoogleLogin
          className="login-form__google"
          clientId={GOOGLE_OAUTH_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          style={{ width: "100%" }}
          isSignedIn={true}
        />
      </div>
    </Form>
  );
};

export default LoginForm;
