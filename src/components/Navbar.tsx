import "../scss/Navbar.scss";

import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import Hamburger from "hamburger-react";
import useWindowSize from "./hooks/useWindowSize";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/user";

const MyNavBar = (props) => {
  const [isOpen, setOpen] = useState(false);
  const user = useSelector(getCurrentUser());
  const [width, height] = useWindowSize();

  const renderNavbar = () => {
    return (
      <Navbar
        sticky="top"
        bg="light"
        variant="light"
        expand="lg"
        expanded={isOpen}
        // className="justify-content-center"
      >
        <Navbar.Toggle>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className={`align-items-center mt-2`}>
            {/* Links */}
            <NavLink
              to="/"
              className="menu-item navbar-brand"
              exact
              style={{ marginRight: "0px", fontSize: "1.25em" }}
            >
              BDO Craft Profit
            </NavLink>
          </Nav>
          <Nav className="ml-md-auto align-items-center mt-2">
            <NavLink to="/" className="menu-item nav-link" exact>
              Home
            </NavLink>
            {user.email == "" && (
              <React.Fragment>
                <NavLink to="/signup" className="menu-item nav-link">
                  SignUp
                </NavLink>
                <NavLink to="/login" className="menu-item nav-link">
                  Log In
                </NavLink>
              </React.Fragment>
            )}
            {user.email != "" && (
              <React.Fragment>
                <NavLink to="/me#Alchemy" className="menu-item nav-link">
                  Your Stats
                </NavLink>
                <NavLink to="/logout" className="menu-item nav-link">
                  Log Out
                </NavLink>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  if (width <= 992) {
    return renderNavbar();
  } else return <Headroom>{renderNavbar()}</Headroom>;
};

export default MyNavBar;
