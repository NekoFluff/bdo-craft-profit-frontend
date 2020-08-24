import '../scss/Navbar.scss'

import React, {useState} from "react";
import {
  Navbar,
  Nav,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Headroom from 'react-headroom';
import Hamburger from 'hamburger-react'
import useWindowSize from './hooks/useWindowSize';

const MyNavBar = () => {
  const [isOpen, setOpen] = useState(false)

  const [width, height] = useWindowSize();


  const renderNavbar = () => {
    let styles = {}
    
    // if (isOpen) {
    //   styles = {maxHeight: 'none', height: '100vh'}
    // } else {
    //   styles = {maxHeight: 'none'}
    // }
    return (
      <Navbar sticky="top" bg="light" variant="light" expand="lg" expanded={isOpen}>
        <Navbar.Toggle><Hamburger toggled={isOpen} toggle={setOpen} /></Navbar.Toggle>
        <Navbar.Collapse>
          <Nav className="mx-md-auto align-items-center mt-2" style={styles}>
            <Navbar.Brand href="/">BDO Craft Profit</Navbar.Brand>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <NavLink to="/" className="menu-item nav-link">Home</NavLink>
            <NavLink to="/login" className="menu-item nav-link">Log In</NavLink>
            <NavLink to="/logout" className="menu-item nav-link">Log Out</NavLink>
            <NavLink to="/signup" className="menu-item nav-link">Sign Up</NavLink>


          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}

        </Navbar.Collapse>
      </Navbar>
    )
  }

  if (width <= 992) {
    return renderNavbar()
  } else 
    return (
      <Headroom>
        {renderNavbar()}
      </Headroom>
    )
};

export default MyNavBar;
