import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Pages
import RecipesPage from "../pages/recipesPage";
import HomePage from "../pages/homePage";
import LoginPage from "../pages/loginPage";
import LogoutPage from "../pages/logoutPage";
import NotFoundPage from "../pages/notFoundPage";
import SignUpPage from "../pages/signUpPage";
import WelcomePage from "../pages/welcomePage";
import UserStatsPage from "../pages/userStatsPage";

const AnimatedSwitch = ({ location }) => {
  return (
    <TransitionGroup style={{ height: "100%" }}>
      <CSSTransition key={location.key} classNames="" timeout={1000}>
        <Switch location={location}>
          <Route path="/" component={HomePage} exact />
          <Route path="/recipes/:item" component={RecipesPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/logout" component={LogoutPage} />
          <Route path="/welcome" component={WelcomePage} />
          <Route path="/me" component={UserStatsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(AnimatedSwitch);
