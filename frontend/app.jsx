import React from "react";
import SignUpFormContainer from "./components/session/signup_form_container";
import { Route } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <h1>You kinda got it guy</h1>
      <Route path="/signup" exact component={SignUpFormContainer} />
    </div>
  );
};
