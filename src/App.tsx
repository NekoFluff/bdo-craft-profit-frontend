import "./scss/App.scss";

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipesPage from "./pages/recipesPage";
import HomePage from "./pages/homePage";
// import Headroom from "react-headroom"
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import MyNavBar from "./components/Navbar";
// import RecipesDashboardSidebar from "./components/RecipesDashboardSidebar";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <div id="outer-container container"> */}
        <Router>
          {/* <RecipesDashboardSidebar></RecipesDashboardSidebar> */}

          <main className="container-fluid main">
            <Switch>
              <Route path="/recipes/:item" component={RecipesPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </main>
        </Router>
        {/* </div> */}
      </Provider>
    );
  }
}

export default App;
