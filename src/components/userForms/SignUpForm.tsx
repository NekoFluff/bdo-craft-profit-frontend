import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { GOOGLE_OAUTH_CLIENT_ID } from "../../helpers/CONSTANTS";
import { RootState } from "../../store/reducer";
import {
  getCurrentUser,
  loginUser,
  signUpUser,
  userFailedLogIn,
} from "../../store/user";

import "../../scss/LoginForm.scss";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const history = useHistory();

  const user = useSelector(getCurrentUser());
  const error = useSelector(
    (state: RootState) => state.entities.currentUser.error
  );

  const checkPassword = useCallback(
    _.debounce((p) => {
      console.log("Password", password, p);
      if (password != p) {
        dispatch(
          userFailedLogIn("Confirmation password does not match password.")
        );
      } else {
        console.log("SUCCESS");
        dispatch(userFailedLogIn(""));
      }
    }, 2000),
    [password]
  );

  useEffect(() => {
    if (user.name != "") history.push("/welcome");
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
      <h1 className="login-form__title">Sign Up</h1>

      {error && <Alert variant={"danger"}>{error}</Alert>}

      <Form.Group className="login-form__group" controlId="formBasicName">
        {/* <Form.Label>EMAIL</Form.Label> */}
        <Form.Control
          className="login-form__control"
          type="name"
          placeholder="Enter username"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

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
            setPassword(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className="login-form__group" controlId="formBasicPassword">
        {/* <Form.Label>PASSWORD</Form.Label> */}
        <Form.Control
          className="login-form__control"
          type="password"
          placeholder="Confirm Password"
          value={confirmationPassword}
          onChange={(e) => {
            setConfirmationPassword(e.target.value);
            checkPassword(e.target.value);
          }}
        />
      </Form.Group>

      {/* <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Stay signed in" />
      </Form.Group> */}

      <Button
        className="login-form__submit"
        disabled={
          name == "" ||
          email == "" ||
          password == "" ||
          confirmationPassword == "" ||
          password != confirmationPassword
        }
        id="container"
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          /* TODO: Warning when confirmation password != password (when the user finishing typing and clicks on the next element) */
          if (password != confirmationPassword) {
            dispatch(
              userFailedLogIn("Password does not match confirmation password.")
            );
          } else {
            dispatch(
              signUpUser({
                name,
                email,
                password,
              })
            );
          }
        }}
      >
        <ArrowForwardIcon id="arrowIcon" />
      </Button>

      <div>
        <GoogleLogin
          className="login-form__google"
          clientId={GOOGLE_OAUTH_CLIENT_ID}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          style={{ width: "100%" }}
          buttonText="Sign up with Google"
        />
      </div>
    </Form>
  );
};

export default SignUpForm;
