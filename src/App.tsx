import React, { Component } from "react";
import "./css/App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipesPage from "./pages/recipesPage";
import HomePage from "./pages/homePage";
import HamburgerMenu from "./components/menu";
// import Headroom from "react-headroom"
class App extends Component {
  render() {
    return (
      <div id="outer-container">
        <Router>
          <HamburgerMenu></HamburgerMenu>
          <main className="container-fluid" id="page-wrap" >
            <h1 className="p-3" align="center">
              {" "}
              Craft Profit{" "}
            </h1>
            <div>


              <Switch>
                <Route path="/recipes/:item" component={RecipesPage}/>
                <Route path="/">
                  <HomePage></HomePage>
                </Route>
              </Switch>
            </div>
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
