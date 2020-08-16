import React, { Component } from 'react';
// import { Button } from 'react-bootstrap'
import SkyLight from 'react-skylight' // http://marcio.github.io/react-skylight/

import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';

class Counter extends Component {
  state = { 
    count: 0
  }

  showModal = () => {
    this.simpleDialog.show();
  }

  hideModal = () => {
    this.simpleDialog.hide();
  }

  callback = (event) => {
    console.log(event)
  }

  handleIncrement = () => {
    this.setState({count: this.state.count+1})
    console.log(this.state.count)
    this.showModal()
  }
  
  render() { 
    return ( 
      <React.Fragment>
        
        <h1>
          Hello World
          
        </h1>
        <AwesomeButton type="primary" onPress={this.handleIncrement}>Primary</AwesomeButton>
        <AwesomeButton className="m-2" type="secondary">Secondary</AwesomeButton>
        <AwesomeButtonSocial
          type="facebook"
          url="https://caferati.me"
        >
          Share
        </AwesomeButtonSocial>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref}>
          <h2>Sample dialogue</h2>
          <p>Count: {this.state.count}</p>
          <AwesomeButton onPress={this.hideModal}>Close</AwesomeButton>
        </SkyLight>

      </React.Fragment>
     );
  }
}
 
export default Counter;