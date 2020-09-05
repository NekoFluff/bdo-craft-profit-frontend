import "../scss/Navbar.scss";

import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
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
    let styles = {};

    return (
      <Navbar
        sticky="top"
        bg="light"
        variant="light"
        expand="lg"
        expanded={isOpen}
        // className="justify-content-center"
      >
        <Navbar.Toggle className="align-self-center">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="mx-md-auto align-items-center mt-2" style={styles}>
            {/* Links */}
            <NavLink to="/" className="menu-item navbar-brand" exact>
              BDO Craft Profit
            </NavLink>

            <NavLink to="/" className="menu-item nav-link" exact>
              Home
            </NavLink>
            {user.email == "" && (
              <NavLink to="/login" className="menu-item nav-link">
                Log In
              </NavLink>
            )}
            {user.email != "" && (
              <React.Fragment>
                <NavLink to="/me" className="menu-item nav-link">
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
