import { elastic as Menu } from 'react-burger-menu'
import React from 'react';
import "../css/MenuSidebar.css"
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

class HamburgerMenu extends React.Component {
  state = {
    isOpen: false
  }
  showSettings (event) {
    event.preventDefault();
    console.log("Show Setting Function TODO")
  }

  onStateChange = (state) => {
    if (this.state.isOpen != state.isOpen) {
      this.setState({isOpen: state.isOpen})
    }
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } isOpen={this.state.isOpen} onStateChange={this.onStateChange}>
        <NavLink to="/" className="menu-item" onClick={() => {this.setState({isOpen: false})}}>Home</NavLink>
        <NavLink to="/recipes" onClick={() => {this.setState({isOpen: false})}}>Recipes</NavLink>
        <NavLink to="/about" onClick={() => {this.setState({isOpen: false})}}>About</NavLink>
        <NavLink to="/contact" onClick={() => {this.setState({isOpen: false})}}>Contact</NavLink>

        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default withRouter(HamburgerMenu)