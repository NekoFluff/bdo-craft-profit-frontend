import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducer";
import { Button } from "react-bootstrap";
import { userLoggedIn } from "../store/user";

const LoginTest = () => {
  const name = useSelector(
    (state: RootState) => state.entities.currentUser.name
  );

  return <div>Signed In: {name}</div>;
};

export default LoginTest;
