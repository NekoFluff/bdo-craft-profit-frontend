import React, { Component } from "react";
import "./css/App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RecipesPage from "./pages/recipesPage";
import HomePage from "./pages/homePage";
import HamburgerMenu from "./components/menu";
import Counter from "./components/hooks/counter";
// import Headroom from "react-headroom"
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MyNavBar from './components/navbar';
const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="outer-container">
          <Router>
            {/* <Counter/> */}
            {/* <HamburgerMenu></HamburgerMenu> */}
            <MyNavBar></MyNavBar>
            <main className="container-fluid" id="page-wrap" >
              <h1 className="p-3" style={{textAlign: 'center'}}>
                Craft Profit v0.2.0
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
      </Provider>
    );
  }
}

export default App;
