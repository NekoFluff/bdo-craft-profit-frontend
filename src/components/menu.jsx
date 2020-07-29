import { elastic as Menu } from 'react-burger-menu'
import React from 'react';
import "../css/MenuSidebar.css"
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

class HamburgerMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
    console.log("Show Setting Function TODO")
  }
 
  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <NavLink to="/" className="menu-item">Home</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default withRouter(HamburgerMenu)