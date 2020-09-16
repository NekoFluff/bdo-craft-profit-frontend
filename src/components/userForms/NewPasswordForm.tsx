import useQuery from "../../components/hooks/useQuery";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { USER_ENDPOINT } from "../../helpers/CONSTANTS";
import { getCurrentUser } from "../../store/user";

import "../../scss/LoginForm.scss";

const NewPasswordForm = () => {
  const query = useQuery();
  const tokenString = query.get("token");
  const tokenObj = jwt(tokenString);

  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loadingState, setLoadingState] = useState("initial");
  const [resetPasswordResult, setResetPasswordResult] = useState("");
  const history = useHistory();

  const user = useSelector(getCurrentUser());
  // const error = useSelector(
  //   (state: RootState) => state.entities.currentUser.error
  // );

  useEffect(() => {
    if (user.name !== "") history.push("/");
  }, [user, history]);

  return (
    <Form className="login-form">
      <h1 className="login-form__title">Forgot Password</h1>

      {resetPasswordResult != "" && (
        <Alert
          variant={
            resetPasswordResult.includes("password set") ? "success" : "danger"
          }
        >
          {resetPasswordResult}
        </Alert>
      )}

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
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => {
            setRepeatPassword(e.target.value);
          }}
        />
      </Form.Group>

      {resetPasswordResult.includes("Invalid token") && (
        <NavLink
          id="forgotPassword"
          to="/forgotPassword"
          className="nav-link"
          style={{ textAlign: "center" }}
        >
          Re-send Token
        </NavLink>
      )}

      <Button
        className="login-form__submit"
        disabled={
          password === "" || repeatPassword === "" || loadingState === "loading"
        }
        id="container"
        variant="primary"
        type="submit"
        style={{ marginBottom: "10%" }}
        onClick={(e) => {
          e.preventDefault();

          if (password != repeatPassword) {
            return setResetPasswordResult("Passwords do not match");
          }

          setLoadingState("loading");
          const sendResetPasswordRequest = async (
            token: string,
            password: string
          ) => {
            try {
              // Get the data
              //
              const { data: result } = await axios.post(
                USER_ENDPOINT + "/resetPassword?token=" + token,
                { password: password }
              );
              // console.log("Reset Password Result:", result);
              setResetPasswordResult(result);
              setLoadingState("complete");
            } catch (e) {
              // setResetPasswordResult(e.message);
              console.log(JSON.stringify(e, null, 4));
            }
          };
          sendResetPasswordRequest(tokenString, password);
        }}
      >
        {loadingState === "loading" ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : (
          <ArrowForwardIcon id="arrowIcon" />
        )}
      </Button>
    </Form>
  );
};

export default NewPasswordForm;
