import React, { useCallback } from "react";
import { GoogleLogin } from "react-google-login";
import { GOOGLE_OAUTH_CLIENT_ID } from "../helpers/CONSTANTS";
import { loginUser } from "../store/user";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "../scss/LoginForm.scss";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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
              "X-Auth-Google-Token": response.tokenId,
            }
          )
        );
      }
    },
    [dispatch]
  );

  return (
    <Form className="login-form">
      <h1
        style={{ marginTop: "2rem", paddingTop: "6rem", paddingBottom: "3rem" }}
      >
        Sign In
      </h1>
      <Form.Group className="login-form__group" controlId="formBasicEmail">
        {/* <Form.Label>EMAIL</Form.Label> */}
        <Form.Control
          className="login-form__control"
          type="email"
          placeholder="Enter email"
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
        />
      </Form.Group>

      {/* <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Stay signed in" />
      </Form.Group> */}

      <Button id="container" variant="primary" type="submit">
        <ArrowForwardIcon id="arrowIcon" />
      </Button>

      <NavLink id="signUp" to="/signup" className="menu-item nav-link">
        Sign Up
      </NavLink>
    </Form>
  );
};

export default LoginForm;
