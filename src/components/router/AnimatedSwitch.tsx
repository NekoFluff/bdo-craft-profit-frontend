import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// Pages
import EmailVerificationPage from "../../pages/emailVerificationPage";
import ForgotPasswordPage from "../../pages/forgotPasswordPage";
import HomePage from "../../pages/homePage";
import LoginPage from "../../pages/loginPage";
import LogoutPage from "../../pages/logoutPage";
import NotFoundPage from "../../pages/notFoundPage";
import RecipesPage from "../../pages/recipesPage";
import ResetPasswordPage from "../../pages/resetPasswordPage";
import SignUpPage from "../../pages/signUpPage";
import UserStatsPage from "../../pages/userStatsPage";
import WelcomePage from "../../pages/welcomePage";

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
          <Route path="/verifyEmail" component={EmailVerificationPage} />
          <Route path="/forgotPassword" component={ForgotPasswordPage} />
          <Route path="/resetPassword" component={ResetPasswordPage} />
          <Route path="/me" component={UserStatsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(AnimatedSwitch);
