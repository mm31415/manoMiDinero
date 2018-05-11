import React from "react";
import SignUpFormContainer from "./components/session/signup_form_container";
import LoginFormContainer from "./components/session/login_form_container";
import HeaderContainer from "./components/header/header_container";
import DashboardContainer from "./components/dashboard/dashboard_container";
import ActivityContainer from "./components/activity/activity_container";
import ExpenseContainer from "./components/expense/expense_container";
import { Friend } from "./components/friend/friend";
import HomepageContainer from "./components/homepage/homepage_container";
import { Route } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Route path="/" component={HeaderContainer} />
      <br></br>

      <Route path="/" exact component={HomepageContainer} />
      <Route path="/dashboard" component={DashboardContainer} />
      <Route path="/activity" component={ActivityContainer} />
      <Route path="/all" component={ExpenseContainer} />
      <Route path="/friends/:friendId" component={Friend} />
      <Route path="/signup" exact component={SignUpFormContainer} />
      <Route path="/login" exact component={LoginFormContainer} />
    </div>
  );
};
