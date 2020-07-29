import React, { Component } from "react";
import "./App.css";
import GridSample from "./components/grid";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RecipesPage from "./pages/recipesPage";
import HomePage from "./pages/homePage";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <main className="container-fluid">
        <Router>
          <h1 className="p-3" align="center">
            {" "}
            Craft Profit{" "}
          </h1>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home Page</Link>
                </li>
                <li>
                  <Link to="/recipes">Recipes Page</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/recipes">
                <RecipesPage></RecipesPage>
              </Route>
              <Route path="/">
                <HomePage></HomePage>
              </Route>
            </Switch>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
