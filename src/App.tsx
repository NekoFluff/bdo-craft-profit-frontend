import "./scss/App.scss";

import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

// My components
import AnimatedSwitch from "./components/router/AnimatedSwitch";
import ScrollToTop from "./components/common/ScrollToTop";

import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <main className="main" style={{ height: "100vh" }}>
              <ScrollToTop />
              <AnimatedSwitch />
            </main>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
