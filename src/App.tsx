import "./scss/App.scss";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipesPage from "./pages/recipesPage";
import HomePage from "./pages/homePage";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import LoginPage from "./pages/loginPage";
import LogoutPage from "./pages/logoutPage";
import NotFoundPage from "./pages/notFoundPage";
import SignUpPage from "./pages/signUpPage";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <main className="main" style={{ height: "100vh" }}>
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/recipes/:item" component={RecipesPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/logout" component={LogoutPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
