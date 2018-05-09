import React from "react";
import SignUpFormContainer from "./components/session/signup_form_container";
import LoginFormContainer from "./components/session/login_form_container";
import HeaderContainer from "./components/header/header_container";
import { Route } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Route path="/" component={HeaderContainer} />
      <h1>You kinda got it guy</h1>
      <Route path="/signup" exact component={SignUpFormContainer} />
      <Route path="/login" exact component={LoginFormContainer} />
    </div>
  );
};
