import "./scss/App.scss";

import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

// My components
import AnimatedSwitch from "./components/AnimatedSwitch";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <main className="main" style={{ height: "100vh" }}>
            <AnimatedSwitch />
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
