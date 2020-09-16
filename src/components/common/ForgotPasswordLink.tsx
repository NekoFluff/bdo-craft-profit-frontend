import React from "react";
import { NavLink } from "react-router-dom";

const ForgotPasswordLink = () => {
  return (
    <NavLink
      id="forgotPassword"
      to="/forgotPassword"
      className="nav-link"
      style={{ textAlign: "right", paddingRight: "0" }}
    >
      Forgot password?
    </NavLink>
  );
};

export default ForgotPasswordLink;
