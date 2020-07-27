import React, { Component } from 'react';
// import { Button } from 'react-bootstrap'
import {
  AwesomeButton,
  AwesomeButtonProgress,
  AwesomeButtonSocial,
} from 'react-awesome-button';

class Counter extends Component {
  state = { 
    count: 0
  }

  handleIncrement = () => {
    this.setState({count: this.state.count+1})
    console.log(this.state.count)
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
      </React.Fragment>
     );
  }
}
 
export default Counter;