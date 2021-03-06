import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Headroom from "react-headroom";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { getCurrentUser } from "../../store/user";
import useWindowSize from "../hooks/useWindowSize";
import SearchBar from "./SearchBar";

import "../../scss/NavBarSearchBar.scss";

const MyNavBar = (props) => {
  const location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const user = useSelector(getCurrentUser());
  const [width] = useWindowSize();

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
          {/* <Col sm={1}>Test</Col>
          <Col sm={10}>Test 2</Col>
          <Col sm={1}>Test 3</Col> */}
          <Nav
            className={`navbar__logo align-items-center mt-2`}
            style={{ width: "100%" }}
          >
            <NavLink
              to="/"
              className="menu-item navbar-brand"
              exact
              style={{ marginRight: "0px", fontSize: "1.25em" }}
            >
              BDO Craft Profit
            </NavLink>
          </Nav>
          <Nav className="navbar__main justify-content-center align-items-center mt-2">
            <NavLink to="/" className="menu-item nav-link" exact>
              Home
            </NavLink>
            {user.email === "" && (
              <React.Fragment>
                <NavLink to="/signup" className="menu-item nav-link">
                  SignUp
                </NavLink>
                <NavLink to="/login" className="menu-item nav-link">
                  Log In
                </NavLink>
              </React.Fragment>
            )}
            {user.email !== "" && (
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
          <Nav className="navbar__search">
            {location.pathname !== "/" && (
              <div className="navbar-searchbar menu-item">
                <SearchBar />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  if (width <= 992) {
    return renderNavbar();
  } else return <Headroom style={{ zIndex: 20 }}>{renderNavbar()}</Headroom>;
};

export default MyNavBar;
