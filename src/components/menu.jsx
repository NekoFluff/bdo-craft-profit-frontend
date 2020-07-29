import { elastic as Menu } from 'react-burger-menu'
import React from 'react';
import "../css/MenuSidebar.css"
import { Link } from 'react-router-dom';
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
        <Link to="/" className="menu-item">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default withRouter(HamburgerMenu)