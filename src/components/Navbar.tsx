import "../scss/Navbar.scss";

import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Headroom from "react-headroom";
import Hamburger from "hamburger-react";
import useWindowSize from "./hooks/useWindowSize";

const MyNavBar = (props) => {
  const [isOpen, setOpen] = useState(false);

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
            <Navbar.Brand href="/">BDO Craft Profit</Navbar.Brand>
            <NavLink to="/" className="menu-item nav-link">
              Home
            </NavLink>
            <NavLink to="/login" className="menu-item nav-link">
              Log In
            </NavLink>
            <NavLink to="/logout" className="menu-item nav-link">
              Log Out
            </NavLink>
            <NavLink to="/signup" className="menu-item nav-link">
              Sign Up
            </NavLink>
          </Nav>

          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    );
  };

  if (width <= 992) {
    return renderNavbar();
  } else return <Headroom>{renderNavbar()}</Headroom>;
};

export default MyNavBar;
