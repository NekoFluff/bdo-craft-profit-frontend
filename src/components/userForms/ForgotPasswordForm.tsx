import { USER_ENDPOINT } from "../../helpers/CONSTANTS";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { RootState } from "../../store/reducer";
import { getCurrentUser, loginUser } from "../../store/user";

import "../../scss/LoginForm.scss";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
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
            resetPasswordResult.includes("reset sent") ? "success" : "danger"
          }
        >
          {resetPasswordResult}
        </Alert>
      )}

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

      <Button
        className="login-form__submit"
        disabled={email === "" || loadingState === "loading"}
        id="container"
        variant="primary"
        type="submit"
        style={{ marginBottom: "10%" }}
        onClick={(e) => {
          e.preventDefault();
          setLoadingState("loading");
          const sendResetPasswordEmail = async (email: string) => {
            try {
              // Get the data
              const { data: result } = await axios.post(
                USER_ENDPOINT + "/resetPassword",
                { email: email }
              );
              // console.log("Verification Result:", result);
              setResetPasswordResult(result);
              setLoadingState("complete");
            } catch (e) {
              console.log(e);
            }
          };
          sendResetPasswordEmail(email);
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

export default ForgotPasswordForm;
