import "./scss/App.scss";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipesPage from "./pages/recipesPage";
import HomePage from "./pages/homePage";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import LoginPage from "./pages/loginPage";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <main className="container-fluid main">
            <Switch>
              <Route path="/recipes/:item" component={RecipesPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
